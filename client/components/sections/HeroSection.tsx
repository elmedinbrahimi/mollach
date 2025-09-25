import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import bg from "../../../assets/background.png";
import {
  FadeInUp,
  FadeInScale,
  SlideInFromBottom,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animation";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeroStats {
  value: number;
  suffix: string;
  label: string;
  color: string;
}

interface HeroSectionProps {
  heroRef: React.RefObject<HTMLDivElement>;
}

export function HeroSection({ heroRef }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState({ projects: 0, users: 0, services: 0 });
  const { t } = useLanguage();

  const heroStats: HeroStats[] = [
    {
      value: 5,
      suffix: "",
      label: t("hero.stats.services"),
      color: "text-accent-blue",
    },
    {
      value: 24,
      suffix: "/7",
      label: t("hero.stats.lab"),
      color: "text-accent-blue",
    },
    {
      value: 100,
      suffix: "%",
      label: t("hero.stats.quality"),
      color: "text-accent-blue",
    },
  ];

  useEffect(() => {
    setIsVisible(true);

    // Animate stats counter
    const animateStats = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;

        setStats({
          projects: Math.floor(5 * progress),
          users: Math.floor(24 * progress),
          services: Math.floor(100 * progress),
        });

        if (step >= steps) {
          clearInterval(timer);
          setStats({ projects: 5, users: 24, services: 100 });
        }
      }, stepDuration);
    };

    const timer = setTimeout(animateStats, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative pt-24 pb-16 overflow-x-hidden min-h-screen"
      style={{
        background:
          "linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), radial-gradient(85.35% 142.1% at 55.91% 154.47%, #93278F 0%, #0D0D5D 54%, #000037 100%)",
      }}
    >
      <img
        src={bg}
        alt="background"
        className="absolute top-0 left-0 w-screen h-full bg-repeat"
      />
      <div className="relative z-10 container mx-auto px-4 sm:px-8 md:px-16 pt-16 sm:pt-20 md:pt-24">
        {/* Hero Content */}
        <FadeInUp className="max-w-[969px] flex justify-center items-center flex-col mx-auto text-center mb-12 sm:mb-16">
          {/* Badge */}
          <FadeInUp delay={0.2} className="mb-4">
            <p className="text-[#C3C3C3] text-center flex items-center text-base sm:text-lg">
              <span>🇨🇭</span>
              {t("hero.badge")}
            </p>
          </FadeInUp>

          {/* Main Heading */}
          <FadeInUp delay={0.4} className="mb-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium font-grotesk text-white leading-tight tracking-tight px-4">
              {t("hero.title")}
            </h1>
          </FadeInUp>

          <FadeInUp delay={0.6} className="mb-6 sm:mb-8 px-4 max-w-2xl">
            <p className="text-sm sm:text-base font-helvetica text-white/80">
              {t("hero.subtitle")}
            </p>
          </FadeInUp>

          <FadeInScale delay={0.8}>
            <Button className="bg-gradient-to-r from-[#472F91] to-[#8F278F] text-white px-8 sm:px-12 py-3 rounded-full font-grotesk mb-6 sm:mb-8 text-sm sm:text-base hover:scale-105 transition-transform duration-200">
              {t("hero.cta")}
            </Button>
          </FadeInScale>
        </FadeInUp>

        {/* Bottom Stats */}
        <SlideInFromBottom
          delay={1.0}
          className="max-w-[896px] mx-auto flex px-4"
        >
          <div
            className="flex flex-col smflex-row items-center mt-10 justify-center gap-4 sm:gap-8 lg:gap-5 px-4 sm:px-8 lg:px-12 py-6 backdrop-blur-sm border border-[#472F91] rounded-2xl  mx-auto"
            style={{ backgroundColor: "rgba(0,0,0,0.16)" }}
          >
            <StaggerContainer className="flex gap-5 flex-col  md:flex-row">
              {heroStats.map((stat, index) => (
                <StaggerItem
                  key={index}
                  className="text-center flex items-center justify-center"
                >
                  <div className="text-xl sm:text-2xl font-grotesk">
                    <span className={stat.color}>
                      {index === 0 && stats.projects}
                      {index === 1 && stats.users}
                      {index === 2 && stats.services}
                      {stat.suffix}
                    </span>
                    <br />
                    <span className="text-white text-sm sm:text-base">
                      {stat.label}
                    </span>
                  </div>
                  {index < heroStats.length - 1 && (
                    <div className="hidden ml-5 sm:block w-px h-12 bg-white/20"></div>
                  )}
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </SlideInFromBottom>
      </div>
      <div
        className="absolute bottom-0 right-0 w-[250px] h-[90px] bg-white 
                clip-path-custom z-10"
      ></div>
    </section>
  );
}
