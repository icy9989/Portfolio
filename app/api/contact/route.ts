import { readContactBody, ContactBodyTooLarge } from "@/lib/contact-body";
import { contactProtection } from "@/lib/contact-protection";
import { sendContactEmail } from "@/lib/email";
import { validateContact } from "@/lib/validation/contact";

export const runtime = "nodejs";

function reply(status: number, message: string, retryAfter?: number) {
  return Response.json({ success: status === 200, message }, {
    status,
    headers: { "Cache-Control": "no-store", ...(retryAfter ? { "Retry-After": String(retryAfter) } : {}) },
  });
}

export async function POST(request: Request) {
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return reply(400, "Please provide valid contact information.");
  }
  let input: unknown;
  try {
    input = await readContactBody(request);
  } catch (error) {
    return error instanceof ContactBodyTooLarge
      ? reply(413, "Your message is too large.")
      : reply(400, "Please provide valid contact information.");
  }
  const result = validateContact(input);
  if (!result.success) return reply(400, "Please provide valid contact information.");
  const reservation = contactProtection.reserve(result.data);
  if (!reservation.allowed) return reply(429, "Please wait before sending another message.", reservation.retryAfter);
  try {
    await sendContactEmail(result.data);
    return reply(200, "Message sent successfully.");
  } catch {
    reservation.release();
    // Do not log message content, credentials, or raw provider errors.
    console.error("Contact email could not be sent. Check server email configuration and provider status.");
    return reply(500, "Unable to send your message right now.");
  }
}
