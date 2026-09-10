export interface ContactRequest {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export type ContactField = keyof ContactRequest;
export type ContactErrors = Partial<Record<ContactField, string>>;
export const contactLimits = { firstName: 50, lastName: 50, email: 254, message: 5000 } as const;
const labels = { firstName: "First Name", lastName: "Last Name", email: "Email", message: "Message" } as const;
// Header-derived fields cannot contain control characters, including CR/LF.
const headerControls = /[\p{Cc}\p{Zl}\p{Zp}]/u;
const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+$/;

export function validateContact(input: unknown):
  | { success: true; data: ContactRequest }
  | { success: false; errors: ContactErrors } {
  const source = input && typeof input === "object" && !Array.isArray(input) ? input as Record<string, unknown> : {};
  const data: ContactRequest = { firstName: "", lastName: "", email: "", message: "" };
  const errors: ContactErrors = {};
  for (const name of Object.keys(contactLimits) as ContactField[]) {
    const raw = source[name];
    if (typeof raw !== "string" || !raw.trim()) {
      errors[name] = `${labels[name]} is required.`;
      continue;
    }
    const value = raw.trim();
    data[name] = value;
    if (value.length > contactLimits[name]) errors[name] = `${labels[name]} must be ${contactLimits[name]} characters or fewer.`;
    else if (name !== "message" && headerControls.test(raw)) errors[name] = `${labels[name]} contains invalid characters.`;
  }
  if (!errors.email && (!emailPattern.test(data.email) || data.email.split("@")[0].length > 64 || data.email.startsWith(".") || data.email.includes("..") || data.email.includes(".@"))) {
    errors.email = "Enter a valid email address.";
  }
  return Object.keys(errors).length ? { success: false, errors } : { success: true, data };
}
