import InteractiveHero from "@/components/hero-section-nexus";
import { HeroWithMockup } from "@/components/hero-with-mockup";
import ProjectsSection from "@/components/projets";
import ServicesSection from '@/components/service';
import TestimonialsSection from '@/components/testimonials';
import FloatingContact from '@/components/floating-contact';
import FloatingLogo from '@/components/floating-logo';
import ContactSection from '@/components/contact-section';

export default function Page() {  
  return (
    <div>
      {/* <FloatingLogo /> */}
      <InteractiveHero/>
      <ServicesSection />
      <ProjectsSection />
      <TestimonialsSection />
      <ContactSection />
      <FloatingContact />
    </div>
  );
}