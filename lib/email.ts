import "server-only";
import { createHash } from "node:crypto";
import type { ContactRequest } from "@/lib/validation/contact";

export async function sendContactEmail({ firstName, lastName, email, message }: ContactRequest): Promise<void> {
  const apiKey = process.env.EMAIL_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim();
  const to = process.env.CONTACT_EMAIL?.trim();
  if (!apiKey || !from || !to) throw new Error("Email configuration is incomplete.");

  const payload = JSON.stringify({
    from,
    to: [to],
    reply_to: email,
    subject: `Portfolio message from ${firstName} ${lastName}`,
    text: `New message from your portfolio Contact form.\n\nName: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage:\n\n${message}`,
  });
  // Stable across retries/instances, including when a provider response is lost.
  const idempotencyKey = `portfolio-contact/${createHash("sha256").update(payload).digest("hex")}`;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": idempotencyKey },
    body: payload,
    signal: AbortSignal.timeout(10_000),
    cache: "no-store",
    redirect: "error",
  });
  if (!response.ok) throw new Error("Email provider rejected the request.");
  const result: unknown = await response.json();
  if (!result || typeof result !== "object" || !("id" in result) || typeof result.id !== "string" || !result.id.trim()) {
    throw new Error("Email provider did not confirm acceptance.");
  }
}
