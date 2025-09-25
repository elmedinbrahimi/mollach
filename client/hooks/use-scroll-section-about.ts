import { useEffect, useState, useRef } from "react";

export function useScrollSectionAbout() {
  const [isDarkBackground, setIsDarkBackground] = useState(false);
  const [isOverContact, setIsOverContact] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Get section positions
      const heroTop = heroRef.current?.offsetTop || 0;
      const heroBottom = heroTop + (heroRef.current?.offsetHeight || 0);
      const statsTop = statsRef.current?.offsetTop || 0;
      const statsBottom = statsTop + (statsRef.current?.offsetHeight || 0);
      const featuresTop = featuresRef.current?.offsetTop || 0;
      const featuresBottom =
        featuresTop + (featuresRef.current?.offsetHeight || 0);
      const missionTop = missionRef.current?.offsetTop || 0;
      const missionBottom =
        missionTop + (missionRef.current?.offsetHeight || 0);

      // Check if over Mission section (dark background)
      const isOverMissionSection =
        scrollY + 100 >= missionTop && scrollY + 100 <= missionBottom;

      // Check if over the dark image part of AboutHeroSection
      // The dark image is at the bottom of the hero section
      const heroHeight = heroRef.current?.offsetHeight || 0;
      const darkImageStart = heroTop + heroHeight * 0.7; // Dark image starts at 70% of hero height
      const isOverDarkImage =
        scrollY + 100 >= darkImageStart && scrollY + 100 <= heroBottom;

      // Set isOverContact to true when over any dark section (mission or hero dark image)
      setIsOverContact(isOverMissionSection || isOverDarkImage);

      // Calculate when header should be dark
      // Header should be dark when over white sections (hero top, stats, features)
      // Header should be light when over dark sections (hero dark image, mission)
      const isOverWhiteSections =
        ((scrollY + 100 >= heroTop && scrollY + 100 < darkImageStart) ||
          (scrollY + 100 >= statsTop && scrollY + 100 <= statsBottom) ||
          (scrollY + 100 >= featuresTop && scrollY + 100 <= featuresBottom)) &&
        !isOverMissionSection;

      const shouldBeDark = isOverWhiteSections && !isOverDarkImage;

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
    statsRef,
    featuresRef,
    missionRef,
  };
}
