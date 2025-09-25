import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/sections/Footer";
import { AboutHeroSection } from "@/components/sections/AboutHeroSection";
import { AboutStatsSection } from "@/components/sections/AboutStatsSection";
import { AboutFeaturesSection } from "@/components/sections/AboutFeaturesSection";
import { AboutMissionSection } from "@/components/sections/AboutMissionSection";
import { useScrollSectionAbout } from "@/hooks/use-scroll-section-about";

const AboutUs: React.FC = () => {
  const {
    isDarkBackground,
    isOverContact,
    heroRef,
    statsRef,
    featuresRef,
    missionRef,
  } = useScrollSectionAbout();

  return (
    <div className="min-h-screen bg-white">
      <Header
        isDarkBackground={isDarkBackground}
        isOverContact={isOverContact}
      />

      <AboutHeroSection heroRef={heroRef} />
      <AboutStatsSection statsRef={statsRef} />
      <AboutFeaturesSection featuresRef={featuresRef} />
      <AboutMissionSection missionRef={missionRef} />

      <Footer />
    </div>
  );
};

export default AboutUs;
