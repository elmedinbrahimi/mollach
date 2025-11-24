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
  title: string;
  description: string;
  oneTime: number;
  annual: number;
  features: string[];
}

interface AddonService {
  name: string;
  icons: React.ComponentType<{ className?: string }>[];
  price: string;
}

interface PricingSectionProps {
  packagesRef: React.RefObject<HTMLDivElement>;
  addonServicesRef: React.RefObject<HTMLDivElement>;
}

export function PricingSection({
  packagesRef,
  addonServicesRef,
}: PricingSectionProps) {
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
  const [animatedAddonPrices, setAnimatedAddonPrices] = useState({
    logo: 0,
    copywriting: 0,
    dataProtection: 0,
    multilingual: 0,
  });

  const pricingPlans: PricingPlan[] = [
    {
      icon: Heart,
      title: t("pricing.starter.title"),
      description: t("pricing.starter.description"),
      oneTime: 890,
      annual: 290,
      features: [
        t("pricing.starter.feature1"),
        t("pricing.starter.feature2"),
        t("pricing.starter.feature3"),
        t("pricing.starter.feature4"),
        t("pricing.starter.feature5"),
        t("pricing.starter.feature6"),
        t("pricing.starter.feature7"),
      ],
    },
    {
      icon: Zap,
      title: t("pricing.business.title"),
      description: t("pricing.business.description"),
      oneTime: 3290,
      annual: 590,
      features: [
        t("pricing.business.feature1"),
        t("pricing.business.feature2"),
        t("pricing.business.feature3"),
        t("pricing.business.feature4"),
        t("pricing.business.feature5"),
        t("pricing.business.feature6"),
        t("pricing.business.feature7"),
        t("pricing.business.feature8"),
      ],
    },
    {
      icon: Crown,
      title: t("pricing.ecomm.title"),
      description: t("pricing.ecomm.description"),
      oneTime: 0,
      annual: 0,
      features: [
        t("pricing.ecomm.feature1"),
        t("pricing.ecomm.feature2"),
        t("pricing.ecomm.feature3"),
        t("pricing.ecomm.feature4"),
        t("pricing.ecomm.feature5"),
        t("pricing.ecomm.feature6"),
        t("pricing.ecomm.feature7"),
      ],
    },
  ];

  const addonServices: AddonService[] = [
    {
      name: t("pricing.addons.logoDesign"),
      icons: [Heart, Zap, Crown],
      price: "390",
    },
    {
      name: t("pricing.addons.copywriting"),
      icons: [Heart, Zap, Crown],
      price: "120",
    },
    {
      name: t("pricing.addons.dataProtection"),
      icons: [Heart, Zap, Crown],
      price: "180",
    },
    {
      name: t("pricing.addons.multilingual"),
      icons: [Heart, Zap, Crown],
      price: "490",
    },
  ];

  useEffect(() => {
    // Animate pricing plans counter
    const animatePrices = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;

        setAnimatedPrices({
          starterOneTime: Math.floor(890 * progress),
          starterAnnual: Math.floor(290 * progress),
          businessOneTime: Math.floor(3290 * progress),
          businessAnnual: Math.floor(590 * progress),
          ecommOneTime: Math.floor(790 * progress),
          ecommAnnual: Math.floor(290 * progress),
        });

        if (step >= steps) {
          clearInterval(timer);
          setAnimatedPrices({
            starterOneTime: 890,
            starterAnnual: 290,
            businessOneTime: 3290,
            businessAnnual: 590,
            ecommOneTime: 790,
            ecommAnnual: 290,
          });
        }
      }, stepDuration);
    };

    // Animate addon services counter
    const animateAddonPrices = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;

        setAnimatedAddonPrices({
          logo: Math.floor(390 * progress),
          copywriting: Math.floor(120 * progress),
          dataProtection: Math.floor(180 * progress),
          multilingual: Math.floor(490 * progress),
        });

        if (step >= steps) {
          clearInterval(timer);
          setAnimatedAddonPrices({
            logo: 390,
            copywriting: 120,
            dataProtection: 180,
            multilingual: 490,
          });
        }
      }, stepDuration);
    };

    const timer1 = setTimeout(animatePrices, 500);
    const timer2 = setTimeout(animateAddonPrices, 1000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <section ref={packagesRef} className="py-16 sm:py-20 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-8 md:px-16">
        <FadeInUp className="text-center mb-12 sm:mb-16">
          <FadeInUp delay={0.2} className="mb-4">
            <span className="text-primary-500 text-lg sm:text-xl font-grotesk tracking-wide">
              {t("pricing.badge")}
            </span>
          </FadeInUp>
          <FadeInUp delay={0.4}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-grotesk text-secondary-900 tracking-tight">
              {t("pricing.title")}
            </h2>
          </FadeInUp>
        </FadeInUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {pricingPlans.map((plan, index) => (
            <StaggerItem key={index}>
              <HoverScale>
                <Card
                  className={`bg-secondary-100 flex flex-col justify-between border-0 rounded-xl p-6 sm:p-8 h-auto min-h-[950px] transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    hoveredPlan === index
                      ? "shadow-xl shadow-purple-500/10"
                      : ""
                  }`}
                  onMouseEnter={() => setHoveredPlan(index)}
                  onMouseLeave={() => setHoveredPlan(null)}
                >
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <plan.icon className="w-[50px] h-[50px] text-primary-500" />
                    <h3 className="text-2xl sm:text-[28px] font-semibold font-grotesk  text-secondary-700">
                      {plan.title}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base font-grotesk text-secondary-400 mb-6 sm:mb-8">
                    {plan.description}
                  </p>

                  <div className="mb-4 sm:mb-6">
                    {index === 2 ? (
                      <div className="text-center py-4">
                        <p className="text-lg sm:text-xl font-semibold font-grotesk text-secondary-700 mb-2">
                          {t("pricing.ecomm.customizable")}
                        </p>
                        <p className="text-base sm:text-lg font-grotesk text-secondary-400">
                          {t("pricing.ecomm.priceOnRequest")}
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-3xl sm:text-4xl font-semibold font-grotesk text-secondary-700">
                            {index === 0 &&
                              animatedPrices.starterOneTime.toLocaleString()}
                            {index === 1 &&
                              animatedPrices.businessOneTime.toLocaleString()}
                          </span>
                          <span className="text-base sm:text-lg font-grotesk text-secondary-400">
                            CHF {t("pricing.starter.oneTime")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-3xl sm:text-4xl font-semibold font-grotesk text-secondary-700">
                            {index === 0 && animatedPrices.starterAnnual}
                            {index === 1 && animatedPrices.businessAnnual}
                          </span>
                          <span className="text-base sm:text-lg font-grotesk text-secondary-400">
                            CHF {t("pricing.starter.annual")}
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="mb-6 sm:mb-8">
                    <h4 className="text-sm sm:text-base font-grotesk text-secondary-500 mb-4 sm:mb-6">
                      Includes:
                    </h4>
                    <div className="space-y-4 sm:space-y-6">
                      {plan.features.map((feature, featureIndex) => (
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
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-[#472F91] to-[#8F278F] text-white py-3 rounded-full font-grotesk mt-auto text-sm sm:text-base hover:scale-105 transition-transform duration-200">
                    {index === 2 ? t("pricing.ecomm.cta") : t("pricing.cta")}
                  </Button>
                </Card>
              </HoverScale>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Add-on Services */}
        <FadeInUp delay={0.6}>
          <div
            ref={addonServicesRef as React.RefObject<HTMLDivElement>}
            className="text-center mb-6 sm:mb-8"
          >
            <h3 className="text-xl sm:text-2xl font-semibold font-grotesk text-secondary-900">
              {t("pricing.addons.title")}
            </h3>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {addonServices.map((service, index) => (
            <StaggerItem key={index}>
              <HoverScale>
                <Card className="bg-secondary-100 border-0 rounded-xl p-6 sm:p-8 hover:scale-105 transition-transform duration-300 hover:shadow-lg">
                  <div className="flex items-center gap-1 mb-3 sm:mb-4">
                    {service.icons.map((Icon, iconIndex) => (
                      <Icon
                        key={iconIndex}
                        className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500"
                      />
                    ))}
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold font-grotesk text-secondary-700 mb-6 sm:mb-8 whitespace-nowrap">
                    {service.name}
                  </h4>
                  <div className="flex items-center justify-between">
                    <p className="text-base sm:text-lg font-grotesk text-secondary-400 mt-2">
                      {t("pricing.addons.startingFrom")}
                    </p>
                    <div>
                      <span className="text-sm sm:text-base font-grotesk text-secondary-400 mr-2">
                        CHF
                      </span>
                      <span className="text-3xl sm:text-4xl font-semibold font-grotesk text-secondary-700">
                        {index === 0 && animatedAddonPrices.logo}
                        {index === 1 && animatedAddonPrices.copywriting}
                        {index === 2 && animatedAddonPrices.dataProtection}
                        {index === 3 && animatedAddonPrices.multilingual}
                      </span>
                    </div>
                  </div>
                </Card>
              </HoverScale>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
