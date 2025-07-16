"use client";
import AgencyWebsite from "@/components/agency";
import Header from "@/components/Header";
import Hero from "@/components/hero";
import HeroGeometric from "@/components/home";
import { FeaturesSection } from "@/components/LandingPage/Features";
import Footer from "@/components/LandingPage/Footer";
import MarqueeComponent from "@/components/LandingPage/MarqueeComponent";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { VelocityScroll } from "@/components/ui/vellocity";

export default function Dashboard() {
  return (
    <div className="overflow-x-hidden">
      <HeroGeometric/>
      {/* <AgencyWebsite /> */}
      <Hero />
      <MarqueeComponent />
      <FeaturesSection />
      <Footer /> 

    </div>


  );
}

