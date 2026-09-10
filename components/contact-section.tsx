import { Mail, Phone, User } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { GitHubIcon, LinkedInIcon } from "@/components/social-icons";
import { contact } from "@/lib/contact";

const details = [
  { label: "Name", value: contact.name, icon: User },
  { label: "Phone", value: contact.phone, href: contact.phoneHref, icon: Phone },
  { label: "Email", value: contact.email, href: `mailto:${contact.email}`, icon: Mail },
  { label: "GitHub", value: "github.com/icy9989", href: contact.github, icon: GitHubIcon, external: true },
  { label: "LinkedIn", value: "linkedin.com/in/kmhtwe", href: contact.linkedin, icon: LinkedInIcon, external: true },
];

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="contact-enter py-16 text-copy-primary sm:py-24">
      <header className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
        <p className="mb-4 text-sm font-semibold text-brand">Contact</p>
        <h2 id="contact-heading" className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Get In <span className="bg-linear-to-r from-brand to-brand-bright bg-clip-text text-transparent">Touch</span>
        </h2>
        <p className="mt-5 leading-7 text-copy-secondary">Have a project, opportunity, or question? Feel free to reach out and I’ll get back to you as soon as possible.</p>
      </header>
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="min-w-0 py-2 sm:py-4">
          <dl className="space-y-6">
            {details.map(({ label, value, href, icon: Icon, external }) => (
              <div key={label} className="flex min-w-0 items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand"><Icon className="size-5" aria-hidden="true" /></span>
                <div className="min-w-0">
                  <dt className="text-sm text-copy-secondary">{label}</dt>
                  <dd className="mt-1 break-words font-medium">
                    {href ? <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} aria-label={external ? `${label} (opens in a new tab)` : undefined} className="inline-flex min-h-11 max-w-full items-center rounded-xl break-all transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">{value}</a> : value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
