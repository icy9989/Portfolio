"use client";

import { useRef, useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactLimits, validateContact, type ContactField, type ContactErrors } from "@/lib/validation/contact";

const fields = [
  { name: "firstName", label: "First Name", placeholder: "First Name", autoComplete: "given-name" },
  { name: "lastName", label: "Last Name", placeholder: "Last Name", autoComplete: "family-name" },
  { name: "email", label: "Email", placeholder: "Type your email", autoComplete: "email" },
  { name: "message", label: "Message", placeholder: "Tell me about your project, opportunity, or question...", autoComplete: "off" },
] as const;
const inputClass = "h-12 rounded-xl border-surface-border bg-base px-3 text-copy-primary focus-visible:border-brand focus-visible:ring-brand/25 dark:bg-base";

export function ContactForm() {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [notice, setNotice] = useState("");
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);
  const submitting = useRef(false);

  function validate(form: HTMLFormElement) {
    return validateContact(Object.fromEntries(new FormData(form)));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const result = validate(form);
    setNotice("");
    setFailed(false);
    setErrors(result.success ? {} : result.errors);
    if (!result.success) {
      const firstInvalid = fields.find(({ name }) => result.errors[name]);
      if (firstInvalid) (form.elements.namedItem(firstInvalid.name) as HTMLElement).focus();
      return;
    }
    submitting.current = true;
    setPending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
        signal: AbortSignal.timeout(20_000),
      });
      const body: unknown = await response.json();
      if (!response.ok || !body || typeof body !== "object" || !("success" in body) || body.success !== true) {
        setFailed(true);
        setNotice(response.status === 429
          ? "Please wait before sending another message, then try again."
          : "Your message couldn't be sent. Please try again.");
        return;
      }
      form.reset();
      setNotice("Thanks! Your message has been sent successfully.");
    } catch {
      setFailed(true);
      setNotice("Your message couldn't be sent. Please try again.");
    } finally {
      submitting.current = false;
      setPending(false);
    }
  }

  return (
    <form noValidate action="/api/contact" method="post" aria-busy={pending} onSubmit={handleSubmit} onChange={(event) => {
      setNotice("");
      const field = event.target;
      if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement)) return;
      if (field.name in errors) {
        const next = validate(event.currentTarget);
        setErrors((previous) => ({ ...previous, [field.name]: next.success ? undefined : next.errors[field.name as ContactField] }));
      }
    }} aria-label="Contact form" aria-describedby="contact-form-note" className="min-w-0 rounded-2xl border border-brand/20 bg-surface p-6 shadow-lg shadow-brand/5 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map(({ name, label, placeholder, autoComplete }) => {
          const props = {
            id: `contact-${name}`, name, placeholder, autoComplete, required: true,
            maxLength: contactLimits[name], disabled: pending,
            "aria-invalid": Boolean(errors[name]),
            "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
          };
          return (
            <div key={name} className={name === "email" || name === "message" ? "min-w-0 sm:col-span-2" : "min-w-0"}>
              <label htmlFor={props.id} className="mb-2 block text-sm font-medium">{label}</label>
              {name === "message" ? <Textarea {...props} className={`${inputClass} min-h-40 resize-y py-3`} /> : <Input {...props} type={name === "email" ? "email" : "text"} className={inputClass} />}
              {errors[name] && <p id={`contact-${name}-error`} className="mt-2 text-sm text-destructive">{errors[name]}</p>}
            </div>
          );
        })}
      </div>
      <p id="contact-form-note" className="mt-5 text-sm leading-6 text-copy-secondary">All fields are required. I’ll reply to the email address you provide.</p>
      <Button type="submit" disabled={pending} size="lg" className="mt-5 min-h-12 w-full rounded-xl bg-linear-to-r from-brand to-brand-bright text-primary-foreground shadow-sm transition hover:opacity-90 motion-safe:hover:-translate-y-0.5 sm:w-auto">
        <Send className="size-5" aria-hidden="true" /> {pending ? "Sending..." : "Send Message"}
      </Button>
      <p role="status" aria-live="polite" className={`mt-4 text-sm leading-6 ${failed ? "text-destructive" : "text-copy-secondary"}`}>{pending ? "Sending your message…" : notice}</p>
    </form>
  );
}
