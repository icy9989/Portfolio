import assert from "node:assert/strict";
import { mock, test } from "node:test";
import { POST } from "../app/api/contact/route";
import { createContactProtection } from "../lib/contact-protection";
import { sendContactEmail } from "../lib/email";
import { validateContact, contactLimits } from "../lib/validation/contact";

const valid = { firstName: "John", lastName: "Doe", email: "john@example.com", message: "Hello from the contact form.\nA second line." };
const request = (body: unknown = valid) => POST(new Request("http://localhost/api/contact", {
  method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
}));

test("shared validation rejects malformed input, trims text, and enforces boundaries", () => {
  for (const value of [null, [], "text", 42, {}, { ...valid, message: 123 }, { ...valid, firstName: " \t " }]) {
    assert.equal(validateContact(value).success, false);
  }
  for (const field of Object.keys(contactLimits) as (keyof typeof contactLimits)[]) {
    assert.equal(validateContact({ ...valid, [field]: "x".repeat(contactLimits[field] + 1) }).success, false);
  }
  for (const email of ["no-at", "a@", "a@b", "a b@example.com", "a@b..com", ".a@example.com", "a..b@example.com", "a.@example.com", "a\r\n@example.com", "a@-domain.com"]) {
    assert.equal(validateContact({ ...valid, email }).success, false, email);
  }
  for (const name of ["John\r\nBcc: victim@example.com", "John\u0000", "John\u2028Doe"]) {
    assert.equal(validateContact({ ...valid, firstName: name }).success, false);
  }
  const trimmed = validateContact({ ...valid, firstName: " John ", message: `  ${valid.message}  ` });
  assert.deepEqual(trimmed, { success: true, data: valid });
  assert.equal(validateContact({ ...valid, firstName: "x".repeat(50), lastName: "x".repeat(50), message: "x".repeat(5000) }).success, true);
  assert.equal(validateContact({ ...valid, firstName: "မင်း", lastName: "O’Connor", email: "john+portfolio@example.com" }).success, true);
});

test("rate protection covers concurrency, failures, per-email and total quotas, and expiry", () => {
  const protection = createContactProtection();
  const first = protection.reserve(valid, 1000);
  assert.equal(first.allowed, true);
  const duplicate = protection.reserve({ ...valid, email: "JOHN@example.com" }, 1001);
  assert.deepEqual(duplicate, { allowed: false, retryAfter: 600 });
  if (first.allowed) first.release();
  assert.equal(protection.reserve(valid, 1002).allowed, true);
  for (let i = 0; i < 3; i++) assert.equal(protection.reserve({ ...valid, message: String(i) }, 1003 + i).allowed, true);
  assert.equal(protection.reserve({ ...valid, message: "over email quota" }, 1006).allowed, false);
  assert.equal(protection.reserve({ ...valid, message: "after expiry" }, 602000).allowed, true);

  const globalProtection = createContactProtection();
  for (let i = 0; i < 30; i++) assert.equal(globalProtection.reserve({ ...valid, email: `visitor${i}@example.com` }, 1000).allowed, true);
  assert.equal(globalProtection.reserve({ ...valid, email: "new@example.com" }, 1001).allowed, false);
  assert.equal(globalProtection.reserve(valid, 601001).allowed, true);
});

test("Contact API and provider adapter enforce the request/response contract without sending mail", async () => {
  const savedEnv = { EMAIL_API_KEY: process.env.EMAIL_API_KEY, EMAIL_FROM: process.env.EMAIL_FROM, CONTACT_EMAIL: process.env.CONTACT_EMAIL };
  process.env.EMAIL_API_KEY = "test-only-key";
  process.env.EMAIL_FROM = "Portfolio <contact@example.com>";
  process.env.CONTACT_EMAIL = "owner@example.com";
  const provider = mock.method(globalThis, "fetch", async () => Response.json({ id: "accepted-email" }));
  const logs = mock.method(console, "error", () => {});
  try {
    for (const body of [null, [], {}, { ...valid, email: "bad" }, { ...valid, message: " " }, { ...valid, firstName: "a".repeat(51) }]) {
      const response = await request(body);
      assert.equal(response.status, 400);
      assert.deepEqual(await response.json(), { success: false, message: "Please provide valid contact information." });
    }
    for (const [body, contentType] of [["{", "application/json"], [JSON.stringify(valid), "text/plain"]]) {
      assert.equal((await POST(new Request("http://localhost/api/contact", { method: "POST", headers: { "Content-Type": contentType }, body }))).status, 400);
    }
    assert.equal((await request({ ...valid, message: "x".repeat(33000) })).status, 413);
    const oversizedStream = new ReadableStream({ start(controller) { controller.enqueue(new Uint8Array(33000)); controller.close(); } });
    const streamed = new Request("http://localhost/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: oversizedStream, duplex: "half" } as RequestInit);
    assert.equal((await POST(streamed)).status, 413);
    assert.equal(provider.mock.callCount(), 0);

    const response = await request({ ...valid, firstName: " John ", message: " <b>Hello</b>\nSecond line " });
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { success: true, message: "Message sent successfully." });
    assert.equal(response.headers.get("Cache-Control"), "no-store");
    const [url, options] = provider.mock.calls[0].arguments as unknown as [string, RequestInit];
    assert.equal(url, "https://api.resend.com/emails");
    const payload = JSON.parse(String(options.body));
    assert.equal(payload.from, process.env.EMAIL_FROM);
    assert.deepEqual(payload.to, [process.env.CONTACT_EMAIL]);
    assert.equal(payload.reply_to, valid.email);
    assert.equal(payload.subject, "Portfolio message from John Doe");
    assert.ok(payload.text.includes("Name: John Doe"));
    assert.ok(payload.text.includes("Email: john@example.com"));
    assert.ok(payload.text.includes("<b>Hello</b>\nSecond line"));
    assert.equal(payload.html, undefined);
    assert.ok(options.signal instanceof AbortSignal);
    assert.equal(new Headers(options.headers).get("Authorization"), "Bearer test-only-key");
    assert.match(new Headers(options.headers).get("Idempotency-Key") ?? "", /^portfolio-contact\/[a-f0-9]{64}$/);

    const duplicate = await request({ ...valid, message: "<b>Hello</b>\nSecond line" });
    assert.equal(duplicate.status, 429);
    assert.ok(Number(duplicate.headers.get("Retry-After")) > 0);
    assert.equal(provider.mock.callCount(), 1);

    let accept: ((response: Response) => void) | undefined;
    provider.mock.mockImplementation(() => new Promise<Response>((resolve) => { accept = resolve; }));
    const pending = request({ ...valid, email: "concurrent@example.com" });
    // Yield until the first request reaches the provider, while its reservation is held.
    for (let i = 0; i < 20 && !accept; i++) await new Promise((resolve) => setImmediate(resolve));
    assert.ok(accept);
    assert.equal((await request({ ...valid, email: "concurrent@example.com" })).status, 429);
    accept(Response.json({ id: "accepted-concurrent" }));
    assert.equal((await pending).status, 200);

    const retryBody = { ...valid, email: "retry@example.com" };
    provider.mock.mockImplementation(async () => Response.json({ error: "secret-provider-detail" }, { status: 403 }));
    const failure = await request(retryBody);
    assert.equal(failure.status, 500);
    assert.deepEqual(await failure.json(), { success: false, message: "Unable to send your message right now." });
    const failedOptions = provider.mock.calls.at(-1)?.arguments as unknown as [string, RequestInit];
    const failedKey = new Headers(failedOptions[1].headers).get("Idempotency-Key");
    provider.mock.mockImplementation(async () => Response.json({ id: "accepted-retry" }));
    assert.equal((await request(retryBody)).status, 200);
    const retriedOptions = provider.mock.calls.at(-1)?.arguments as unknown as [string, RequestInit];
    assert.equal(new Headers(retriedOptions[1].headers).get("Idempotency-Key"), failedKey);

    for (const [index, result] of [{}, { id: "" }, { success: true }].entries()) {
      provider.mock.mockImplementation(async () => Response.json(result));
      assert.equal((await request({ ...valid, email: `unconfirmed${index}@example.com` })).status, 500);
    }
    provider.mock.mockImplementation(async () => { throw new Error("private-network-details"); });
    const networkFailure = await request({ ...valid, email: "network@example.com" });
    assert.equal(networkFailure.status, 500);
    assert.ok(!(await networkFailure.text()).includes("private-network-details"));
    assert.ok(JSON.stringify(logs.mock.calls).includes("Check server email configuration"));
    assert.ok(!JSON.stringify(logs.mock.calls).includes("secret-provider-detail"));
    delete process.env.EMAIL_API_KEY;
    const before = provider.mock.callCount();
    await assert.rejects(sendContactEmail(valid), /configuration is incomplete/);
    assert.equal((await request({ ...valid, email: "unconfigured@example.com" })).status, 500);
    assert.equal(provider.mock.callCount(), before);
  } finally {
    provider.mock.restore();
    logs.mock.restore();
    for (const [key, value] of Object.entries(savedEnv)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});
