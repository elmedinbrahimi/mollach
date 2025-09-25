import { Globe, Target, Lightbulb, Users, Zap, Shield } from "lucide-react";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
  HoverScale,
} from "@/components/ui/animation";
import { useLanguage } from "@/contexts/LanguageContext";

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface WhyMollaSectionProps {
  whyMollaRef: React.RefObject<HTMLDivElement>;
}

export function WhyMollaSection({ whyMollaRef }: WhyMollaSectionProps) {
  const { t } = useLanguage();

  const features: Feature[] = [
    {
      icon: Globe,
      title: t("about.competence.title"),
      description: t("about.competence.desc"),
    },
    {
      icon: Users,
      title: t("about.team.title"),
      description: t("about.team.desc"),
    },
    {
      icon: Lightbulb,
      title: t("about.implementation.title"),
      description: t("about.implementation.desc"),
    },
  ];

  return (
    <section ref={whyMollaRef} className="py-16 sm:py-20 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-8 md:px-16">
        <FadeInUp className="text-center mb-12 sm:mb-16">
          <FadeInUp delay={0.2} className="mb-4">
            <span className="text-primary-500 text-lg sm:text-xl font-grotesk tracking-wide">
              {t("about.badge")}
            </span>
          </FadeInUp>
          <FadeInUp delay={0.4}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-grotesk text-secondary-900 tracking-tight">
              {t("about.title")}
            </h2>
          </FadeInUp>
        </FadeInUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <StaggerItem key={index}>
              <HoverScale>
                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-purple-100 transition-colors duration-300">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#472F91] to-[#8F278F] rounded-lg flex items-center justify-center">
                      <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold font-grotesk text-secondary-700 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base font-grotesk text-secondary-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </HoverScale>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
