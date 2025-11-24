import { Header } from "@/components/Header";
import { useScrollSection } from "@/hooks/use-scroll-section";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhyMollaSection } from "@/components/sections/WhyMollaSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/sections/Footer";
import { PricingSection } from "@/components/sections/PricingSection";
import { WhatWereBestAtSection } from "@/components/sections/WhatWereBestAtSection";
import { AddOnServicesSection } from "@/components/sections/AddOnServicesSection";

export default function Index() {
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

      <HeroSection heroRef={heroRef} />
      <WhyMollaSection whyMollaRef={whyMollaRef} />
      {/* <ServicesSection servicesRef={servicesRef} /> */}
      <WhatWereBestAtSection servicesRef={servicesRef} />
      {/* <PricingSection
        packagesRef={packagesRef}
        addonServicesRef={addonServicesRef}
      /> */}
      <AddOnServicesSection addonServicesRef={addonServicesRef} />

      <CTASection journeyRef={journeyRef} />
      <Footer />
    </div>
  );
}
