import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
  HoverScale,
} from "@/components/ui/animation";
import { useLanguage } from "@/contexts/LanguageContext";

interface CTASectionProps {
  journeyRef: React.RefObject<HTMLDivElement>;
}

export function CTASection({ journeyRef }: CTASectionProps) {
  const { t } = useLanguage();

  return (
    <div className="p-5 md:p-8 lg:p-12">
      <section
        ref={journeyRef}
        className="py-16 rounded-[30px] sm:py-20 md:py-24 bg-gradient-to-r from-[#000037] via-[#0D0D5D] to-[#93278F] relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-8 md:px-16 text-center">
          <StaggerContainer>
            <StaggerItem>
              <FadeInUp delay={0.2} className="mb-4 sm:mb-6">
                <span className="text-primary-500 text-lg sm:text-xl font-semibold font-grotesk tracking-wide">
                  {t("contact.badge")}
                </span>
              </FadeInUp>
            </StaggerItem>

            <StaggerItem>
              <FadeInUp delay={0.4} className="mb-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-grotesk text-white tracking-tight">
                  {t("contact.title")}
                </h2>
              </FadeInUp>
            </StaggerItem>

            <StaggerItem>
              <FadeInUp delay={0.6} className="mb-6">
                <p className="text-gray-300 text-lg sm:text-xl font-grotesk">
                  {t("contact.subtitle")}
                </p>
              </FadeInUp>
            </StaggerItem>

            <StaggerItem>
              <StaggerContainer className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 lg:gap-12 mb-6 sm:mb-8">
                <StaggerItem>
                  <span className="text-gray-300 text-lg sm:text-xl font-grotesk hover:text-white transition-colors duration-200">
                    {t("contact.email")}
                  </span>
                </StaggerItem>
                <StaggerItem>
                  <span className="text-gray-300 text-lg sm:text-xl font-grotesk hover:text-white transition-colors duration-200">
                    {t("contact.phone")}
                  </span>
                </StaggerItem>
                <StaggerItem>
                  <span className="text-gray-300 text-lg sm:text-xl font-grotesk hover:text-white transition-colors duration-200">
                    {t("contact.location")}
                  </span>
                </StaggerItem>
              </StaggerContainer>
            </StaggerItem>

            <StaggerItem>
              <HoverScale>
                <Link to="/contact">
                  <Button className="bg-gradient-to-r from-[#472F91] to-[#8F278F] text-white px-8 sm:px-12 py-3 rounded-full font-grotesk text-sm sm:text-base hover:scale-105 transition-transform duration-200">
                    {t("contact.cta")}
                  </Button>
                </Link>
              </HoverScale>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
