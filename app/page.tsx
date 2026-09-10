import { connection } from "next/server";
import { AboutSection } from "@/components/about-section";
import { HeroSection } from "@/components/hero-section";
import { Navbar } from "@/components/navbar";
import { SkillsSection } from "@/components/skills-section";
import { ServicesSection } from "@/components/services-section";
import { MilestonesSection } from "@/components/milestones-section";
import { ProjectsSection } from "@/components/projects-section";
import { getProjects } from "@/lib/project-queries";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default async function Home() {
  await connection();
  const projects = await getProjects();
  return (
    <div id="home" className="relative isolate">
      <Navbar />
      <main>
        <div className="mx-auto max-w-7xl px-7 sm:px-6">
          <HeroSection />
          <AboutSection />
        </div>
        <SkillsSection />
        <div className="mx-auto max-w-7xl px-7 sm:px-6">
          <ServicesSection />
          <MilestonesSection />
          <ProjectsSection projects={projects} />
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
