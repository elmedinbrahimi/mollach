import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Heart, Zap, Crown } from "lucide-react";
import { useState, useEffect } from "react";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
  HoverScale,
} from "@/components/ui/animation";
import { useLanguage } from "@/contexts/LanguageContext";

interface PricingPlan {
  icon: React.ComponentType<{ className?: string }>;
  titleKey: string;
  descriptionKey: string;
  oneTime: number;
  annual: number;
  featureKeys: string[];
  popular?: boolean;
}

interface ServicesPricingSectionProps {
  packagesRef: React.RefObject<HTMLDivElement>;
}

export function ServicesPricingSection({ packagesRef }: ServicesPricingSectionProps) {
  const { t } = useLanguage();
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
  const [animatedPrices, setAnimatedPrices] = useState({
    starterOneTime: 0,
    starterAnnual: 0,
    businessOneTime: 0,
    businessAnnual: 0,
    ecommOneTime: 0,
    ecommAnnual: 0,
  });

  const pricingPlans: PricingPlan[] = [
    {
      icon: Heart,
      titleKey: "servicesPricing.starter.title",
      descriptionKey: "servicesPricing.starter.description",
      oneTime: 790,
      annual: 290,
      featureKeys: [
        "servicesPricing.starter.feature1",
        "servicesPricing.starter.feature2",
        "servicesPricing.starter.feature3",
        "servicesPricing.starter.feature4",
        "servicesPricing.starter.feature5",
        "servicesPricing.starter.feature6",
      ],
    },
    {
      icon: Zap,
      titleKey: "servicesPricing.business.title",
      descriptionKey: "servicesPricing.business.description",
      oneTime: 1490,
      annual: 390,
      popular: true,
      featureKeys: [
        "servicesPricing.business.feature1",
        "servicesPricing.business.feature2",
        "servicesPricing.business.feature3",
        "servicesPricing.business.feature4",
        "servicesPricing.business.feature5",
        "servicesPricing.business.feature6",
      ],
    },
    {
      icon: Crown,
      titleKey: "servicesPricing.ecomm.title",
      descriptionKey: "servicesPricing.ecomm.description",
      oneTime: 790,
      annual: 290,
      featureKeys: [
        "servicesPricing.ecomm.feature1",
        "servicesPricing.ecomm.feature2",
        "servicesPricing.ecomm.feature3",
        "servicesPricing.ecomm.feature4",
        "servicesPricing.ecomm.feature5",
        "servicesPricing.ecomm.feature6",
      ],
    },
  ];

  useEffect(() => {
    const animatePrices = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;

        setAnimatedPrices({
          starterOneTime: Math.floor(790 * progress),
          starterAnnual: Math.floor(290 * progress),
          businessOneTime: Math.floor(1490 * progress),
          businessAnnual: Math.floor(390 * progress),
          ecommOneTime: Math.floor(790 * progress),
          ecommAnnual: Math.floor(290 * progress),
        });

        if (step >= steps) {
          clearInterval(timer);
          setAnimatedPrices({
            starterOneTime: 790,
            starterAnnual: 290,
            businessOneTime: 1490,
            businessAnnual: 390,
            ecommOneTime: 790,
            ecommAnnual: 290,
          });
        }
      }, stepDuration);
    };

    const timer = setTimeout(animatePrices, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={packagesRef} className="py-16 sm:py-20 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-8 md:px-16">
        <FadeInUp className="text-center mb-12 sm:mb-16">
          <FadeInUp delay={0.1} className="mb-4">
            <span className="text-primary-500 text-lg sm:text-xl font-grotesk tracking-wide">
              {t("servicesPricing.badge")}
            </span>
          </FadeInUp>
          <FadeInUp delay={0.2} className="mb-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-grotesk text-secondary-900 tracking-tight">
              {t("servicesPricing.title")}
            </h2>
          </FadeInUp>
        </FadeInUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pricingPlans.map((plan, index) => (
            <StaggerItem key={index}>
              <HoverScale>
                <Card
                  className={`relative bg-secondary-100 border-0 rounded-2xl p-6 sm:p-8 h-auto transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    plan.popular ? 'ring-2 ring-primary-500 ring-offset-2' : ''
                  } ${
                    hoveredPlan === index
                      ? "shadow-xl shadow-purple-500/10"
                      : ""
                  }`}
                  onMouseEnter={() => setHoveredPlan(index)}
                  onMouseLeave={() => setHoveredPlan(null)}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-[#472F91] to-[#8F278F] text-white px-4 py-2 rounded-full text-sm font-medium">
                        {t("servicesPricing.mostPopular")}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <plan.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-500" />
                    <h3 className="text-2xl sm:text-[28px] font-semibold font-grotesk text-secondary-700">
                      {t(plan.titleKey)}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base font-grotesk text-secondary-400 mb-6 sm:mb-8">
                    {t(plan.descriptionKey)}
                  </p>

                  <div className="mb-4 sm:mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-3xl sm:text-4xl font-semibold font-grotesk text-secondary-700">
                        {index === 0 && animatedPrices.starterOneTime.toLocaleString()}
                        {index === 1 && animatedPrices.businessOneTime.toLocaleString()}
                        {index === 2 && animatedPrices.ecommOneTime.toLocaleString()}
                      </span>
                      <span className="text-base sm:text-lg font-grotesk text-secondary-400">
                        {t("servicesPricing.oneTime")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl sm:text-4xl font-semibold font-grotesk text-secondary-700">
                        {index === 0 && animatedPrices.starterAnnual}
                        {index === 1 && animatedPrices.businessAnnual}
                        {index === 2 && animatedPrices.ecommAnnual}
                      </span>
                      <span className="text-base sm:text-lg font-grotesk text-secondary-400">
                        {t("servicesPricing.annually")}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6 sm:mb-8">
                    <div className="space-y-4 sm:space-y-6">
                      {plan.featureKeys.map((featureKey, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-start gap-3"
                        >
                          <Check className="w-5 h-5 sm:w-6 sm:h-6 text-accent-green mt-0.5 flex-shrink-0" />
                          <span
                            className={`text-base sm:text-lg font-grotesk text-secondary-700 ${
                              featureIndex === 0 ? "font-semibold" : ""
                            }`}
                          >
                            {t(featureKey)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className={`w-full text-white py-3 rounded-full font-grotesk mt-auto text-sm sm:text-base hover:scale-105 transition-transform duration-200 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-[#472F91] to-[#8F278F]'
                      : 'bg-gradient-to-r from-[#472F91] to-[#8F278F]'
                  }`}>
                    {t("servicesPricing.getStarted")}
                  </Button>
                </Card>
              </HoverScale>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}