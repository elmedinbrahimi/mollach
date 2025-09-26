import { Header } from "@/components/Header";
import { useScrollSection } from "@/hooks/use-scroll-section";
import { Footer } from "@/components/sections/Footer";
import { ServicesHeroSection } from "@/components/sections/ServicesHeroSection";
import { HowWeWorkSection } from "@/components/sections/HowWeWorkSection";
import { WhatWereBestAtSection } from "@/components/sections/WhatWereBestAtSection";
import { ServicesPricingSection } from "@/components/sections/ServicesPricingSection";
import { AddOnServicesSection } from "@/components/sections/AddOnServicesSection";

export default function Services() {
  const {
    isDarkBackground,
    isOverContact,
    heroRef,
    servicesRef,
    whyMollaRef,
    journeyRef,
    packagesRef,
    addonServicesRef,
  } = useScrollSection();

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Header
        isDarkBackground={isDarkBackground}
        isOverContact={isOverContact}
      />

      <ServicesHeroSection heroRef={heroRef} />
      <HowWeWorkSection whyMollaRef={whyMollaRef} />
      <WhatWereBestAtSection servicesRef={servicesRef} />
      <ServicesPricingSection packagesRef={packagesRef} />
      <AddOnServicesSection addonServicesRef={addonServicesRef} />
      <Footer />
    </div>
  );
}