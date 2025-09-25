import { useEffect, useState, useRef } from "react";

export function useScrollSection() {
  const [isDarkBackground, setIsDarkBackground] = useState(false);
  const [isOverContact, setIsOverContact] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const whyMollaRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const packagesRef = useRef<HTMLDivElement>(null);
  const addonServicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Get section positions
      const heroTop = heroRef.current?.offsetTop || 0;
      const servicesTop = servicesRef.current?.offsetTop || 0;
      const servicesBottom =
        servicesTop + (servicesRef.current?.offsetHeight || 0);
      const whyMollaTop = whyMollaRef.current?.offsetTop || 0;
      const journeyTop = journeyRef.current?.offsetTop || 0;
      const journeyBottom =
        journeyTop + (journeyRef.current?.offsetHeight || 0);

      // Check if over Contact section
      const isOverContactSection =
        scrollY + 100 >= journeyTop && scrollY + 100 <= journeyBottom;
      setIsOverContact(isOverContactSection);

      // Calculate when header should be dark (when it reaches these sections)
      // But NOT when it's over the Services section (which has dark background)
      const isOverServices =
        scrollY + 100 >= servicesTop && scrollY + 100 <= servicesBottom;
      const isOverHero = scrollY < whyMollaTop; // Hero section is before Why Molla section
      const shouldBeDark =
        !isOverServices &&
        !isOverHero &&
        !isOverContactSection && // Don't make dark when over Contact section
        scrollY + 100 >= whyMollaTop; // "Why Molla?" section only

      setIsDarkBackground(shouldBeDark);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return {
    isDarkBackground,
    isOverContact,
    heroRef,
    servicesRef,
    whyMollaRef,
    journeyRef,
    packagesRef,
    addonServicesRef,
  };
}
