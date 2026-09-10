import "server-only";
import { createHash } from "node:crypto";
import type { ContactRequest } from "@/lib/validation/contact";

const WINDOW_MS = 10 * 60 * 1000;
const EMAIL_LIMIT = 5;
const TOTAL_LIMIT = 30;

interface Attempt {
  emailHash: string;
  timestamp: number;
}

// Bounded per-process state; intentionally contains no email addresses or messages.
export function createContactProtection() {
  let attempts: Attempt[] = [];
  const duplicates = new Map<string, number>();

  return {
    reserve(data: ContactRequest, now = Date.now()) {
      attempts = attempts.filter(({ timestamp }) => timestamp > now - WINDOW_MS);
      for (const [key, expires] of duplicates) if (expires <= now) duplicates.delete(key);
      const emailHash = createHash("sha256").update(data.email.toLowerCase()).digest("hex");
      const fingerprint = createHash("sha256").update(JSON.stringify({ ...data, email: data.email.toLowerCase() })).digest("hex");
      const duplicateExpiry = duplicates.get(fingerprint);
      const emailAttempts = attempts.filter((attempt) => attempt.emailHash === emailHash);
      const quotaExpiry = attempts.length >= TOTAL_LIMIT ? attempts[0].timestamp + WINDOW_MS
        : emailAttempts.length >= EMAIL_LIMIT ? emailAttempts[0].timestamp + WINDOW_MS : undefined;
      const expires = duplicateExpiry ?? quotaExpiry;
      if (expires !== undefined) {
        return { allowed: false as const, retryAfter: Math.max(1, Math.ceil((expires - now) / 1000)) };
      }
      attempts.push({ emailHash, timestamp: now });
      duplicates.set(fingerprint, now + WINDOW_MS);
      return { allowed: true as const, release: () => { duplicates.delete(fingerprint); } };
    },
  };
}

export const contactProtection = createContactProtection();
