import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/social-icons";
import { contact } from "@/lib/contact";
import { navigationLinks } from "@/lib/navigation";

const socialLinks = [
  { label: "GitHub", href: contact.github, icon: GitHubIcon, external: true },
  { label: "LinkedIn", href: contact.linkedin, icon: LinkedInIcon, external: true },
  { label: "Email", href: `mailto:${contact.email}`, icon: Mail, external: false },
];

export function Footer() {
  return (
    <footer className="bg-surface-elevated text-copy-primary dark:bg-surface">
      <div className="mx-auto max-w-7xl px-7 pt-12 pb-6 sm:px-6">
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.5fr_auto]">
          <div><p className="text-xl font-semibold">{contact.name}</p><p className="mt-2 text-sm text-copy-secondary">{contact.title}</p></div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-1 lg:justify-center">
            {navigationLinks.map(({ id, label }) => <a key={id} href={`#${id}`} className="inline-flex min-h-11 items-center rounded-xl text-sm text-copy-secondary transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">{label}</a>)}
          </nav>
          <div className="flex gap-3">
            {socialLinks.map(({ label, href, icon: Icon, external }) => <a key={label} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} aria-label={external ? `${label} (opens in a new tab)` : "Email"} className="flex size-11 items-center justify-center rounded-xl border border-brand/20 bg-brand/5 text-brand transition-colors hover:bg-brand/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"><Icon className="size-5" aria-hidden="true" /></a>)}
          </div>
        </div>
        <p className="mt-9 border-t border-surface-border pt-6 text-center text-sm text-copy-secondary">© {new Date().getFullYear()} {contact.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
