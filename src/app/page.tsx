import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { WorkSection } from "@/components/WorkSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ScrollDownButton } from "@/components/ScrollDownButton";

export default function Home() {
  return (
    <main className="relative w-full">
      <Navbar />

      {/* Hero — full screen */}
      <section className="min-h-screen flex flex-col pt-16">
        <div className="flex-1 flex flex-col w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 justify-center py-12">
          <HeroSection />
        </div>
        <ScrollDownButton target="#about" />
      </section>

      {/* About + Skills — full screen */}
      <section id="about" className="min-h-screen flex flex-col pt-16">
        <div className="flex-1 flex items-center w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 py-12">
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-[24px]">
            <AboutSection />
            <SkillsSection />
          </div>
        </div>
        <ScrollDownButton target="#work" />
      </section>

      {/* Work — stacked project rows */}
      <section className="flex flex-col pt-16 mt-16">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 py-12">
          <WorkSection />
        </div>
        <ScrollDownButton target="#contact" />
      </section>

      {/* Contact — full screen */}
      <section className="min-h-screen flex flex-col pt-16">
        <div className="flex-1 flex items-center w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 py-12">
          <ContactSection />
        </div>
      </section>

      <Footer />
    </main>
  );
}
