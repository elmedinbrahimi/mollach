import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowUpRight,
  Globe,
  Lightbulb,
  Users,
  Shield,
  Zap,
} from "lucide-react";
import { useState } from "react";
import {
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  StaggerContainer,
  StaggerItem,
  HoverScale,
  HoverRotate,
} from "@/components/ui/animation";
import { useLanguage } from "@/contexts/LanguageContext";

interface Service {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface ServicesSectionProps {
  servicesRef: React.RefObject<HTMLDivElement>;
}

export function ServicesSection({ servicesRef }: ServicesSectionProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { t } = useLanguage();

  const services: Service[] = [
    {
      icon: Globe,
      title: t("services.platforms.title"),
      description: t("services.platforms.desc"),
    },
    {
      icon: Zap,
      title: t("services.solutions.title"),
      description: t("services.solutions.desc"),
    },
    {
      icon: Lightbulb,
      title: t("services.lab.title"),
      description: t("services.lab.desc"),
    },
    {
      icon: Users,
      title: t("services.partnerships.title"),
      description: t("services.partnerships.desc"),
    },
    {
      icon: Shield,
      title: t("services.security.title"),
      description: t("services.security.desc"),
    },
  ];

  return (
    <section
      ref={servicesRef}
      className="py-16 sm:py-20 md:py-24"
      style={{
        background:
          "linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), radial-gradient(85.35% 142.1% at 55.91% 154.47%, #93278F 0%, #0D0D5D 54%, #000037 100%)",
      }}
    >
      <div className="container mx-auto px-4 sm:px-8 md:px-16">
        <FadeInUp className="mb-12 sm:mb-16">
          <FadeInUp delay={0.2} className="mb-4">
            <span className="text-primary-500 text-lg sm:text-xl font-jakarta font-semibold tracking-wide">
              {t("services.badge")}
            </span>
          </FadeInUp>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <FadeInLeft delay={0.4}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-grotesk text-white tracking-tight">
                {t("services.title")}
              </h2>
            </FadeInLeft>
            <FadeInRight delay={0.6}>
              <HoverScale>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#472F91] text-white bg-transparent hover:text-white hover:bg-white/10 px-4 py-2 h-10 rounded-full text-sm font-grotesk self-start sm:self-auto hover:scale-105 transition-transform duration-200"
                >
                  Check our services <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </HoverScale>
            </FadeInRight>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Service Cards */}
          {services.map((service, index) => (
            <StaggerItem key={index}>
              <HoverScale>
                <Card
                  className={`bg-white/[7%] backdrop-blur-sm border-0 rounded-xl p-4 sm:p-6 h-auto sm:h-[349px] transition-all duration-300 hover:bg-white/[12%] hover:scale-105 ${
                    hoveredCard === index
                      ? "shadow-lg shadow-purple-500/20"
                      : ""
                  }`}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="flex justify-between items-start mb-8 sm:mb-16">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#472F91] to-[#8F278F] rounded-lg flex items-center justify-center">
                      <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <HoverRotate>
                      <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 text-accent-blue transition-transform duration-200 group-hover:rotate-45" />
                    </HoverRotate>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold font-grotesk text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base font-grotesk text-gray-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </Card>
              </HoverScale>
            </StaggerItem>
          ))}

          {/* CTA Card */}
          <StaggerItem>
            <HoverScale>
              <Card className="bg-white/[7%] backdrop-blur-sm border-0 rounded-xl p-4 sm:p-6 h-auto sm:h-[349px] flex flex-col items-center justify-center text-center hover:bg-white/[12%] transition-all duration-300">
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-semibold font-grotesk text-white mb-3">
                    {t("services.cta.title")}
                  </h3>
                  <p className="text-sm sm:text-base font-grotesk text-gray-400 leading-relaxed">
                    {t("services.cta.desc")}
                  </p>
                </div>
                <Button className="bg-gradient-to-r from-[#472F91] to-[#8F278F] text-white px-8 sm:px-12 py-3 rounded-full font-grotesk text-sm sm:text-base hover:scale-105 transition-transform duration-200">
                  {t("services.cta.button")}
                </Button>
              </Card>
            </HoverScale>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
