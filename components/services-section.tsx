import { ArrowRight, Bot, BrainCircuit, CircleCheck, Cloud, Code2, Server } from "lucide-react";

const services = [
  {
    title: "Frontend Development",
    icon: Code2,
    description: "Build responsive and user-focused web interfaces using modern frontend technologies with an emphasis on usability, performance, and maintainable code.",
    capabilities: ["React & Next.js Development", "Responsive UI Development", "TypeScript & JavaScript"],
  },
  {
    title: "Backend Development",
    icon: Server,
    description: "Develop reliable backend services and APIs that support scalable web applications and connect application logic with databases and external systems.",
    capabilities: ["Node.js Backend Services", "REST API Development", "Database Integration"],
  },
  {
    title: "AI / ML",
    icon: BrainCircuit,
    description: "Build and integrate AI-powered functionality using Python and modern machine learning technologies to create smarter and more useful software experiences.",
    capabilities: ["AI-Powered Applications", "Machine Learning Integration", "Python Development"],
  },
  {
    title: "Cloud",
    icon: Cloud,
    description: "Build and deploy modern applications using cloud technologies with a focus on reliable environments, scalable infrastructure, and application deployment.",
    capabilities: ["Cloud Deployment", "AWS Services", "Application Infrastructure"],
  },
  {
    title: "Robotics",
    icon: Bot,
    description: "Explore software-driven robotics systems by combining programming, intelligent systems, and automation concepts for real-world applications.",
    capabilities: ["Robotics Software", "Automation", "Intelligent Systems"],
  },
];

export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-heading" className="py-16 text-copy-primary sm:py-24">
      <header className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
        <p className="mb-4 text-sm font-semibold text-brand">Services</p>
        <h2 id="services-heading" className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          What I <span className="bg-linear-to-r from-brand to-brand-bright bg-clip-text text-transparent">Offer</span>
        </h2>
        <p className="mt-5 text-base leading-7 text-copy-secondary">
          Software development services focused on building modern, scalable, and intelligent applications.
        </p>
      </header>
      <div className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {services.map(({ title, icon: Icon, description, capabilities }, index) => (
          <div key={title} className="service-enter min-w-0" style={{ animationDelay: `${index * 80}ms` }}>
            <article className="group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border-0 bg-surface dark:border dark:border-brand/15 p-6 shadow-lg shadow-brand/5 transition duration-300 dark:hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10 dark:focus-within:border-brand/40 motion-safe:hover:-translate-y-1 sm:p-8">
              <div aria-hidden="true" className="pointer-events-none absolute -top-12 -right-12 -z-10 size-56 rounded-full bg-brand/5 blur-3xl transition-colors duration-300 group-hover:bg-brand/10" />
              <div className="mb-6 flex size-16 items-center justify-center rounded-xl bg-linear-to-br from-brand/20 to-brand-bright/10 text-brand transition-transform duration-300 motion-safe:group-hover:scale-105">
                <Icon aria-hidden="true" className="size-8" />
              </div>
              <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{title}</h3>
              <p className="mt-4 flex-1 text-base leading-7 text-copy-secondary">{description}</p>
              <ul className="mt-6 space-y-3">
                {capabilities.map((capability) => (
                  <li key={capability} className="flex items-start gap-3 text-sm leading-6 text-copy-secondary">
                    <CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand" />
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact" aria-label={`Learn more about ${title} — contact me`} className="mt-6 inline-flex min-h-11 w-fit items-center gap-2 rounded-xl font-semibold text-brand outline-offset-4 transition-colors hover:text-brand-bright focus-visible:outline-2 focus-visible:outline-brand">
                Learn More <ArrowRight aria-hidden="true" className="size-5" />
              </a>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
