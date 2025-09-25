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
      title: "Starter",
      description: "Ideal for simple, yet professional web presences",
      oneTime: 790,
      annual: 290,
      features: [
        "Up to 3 content pages",
        "Responsive design",
        "4 royalty-free images",
        "4 content updates per year",
        ".ch domain with SSL",
        "Basic SEO",
      ],
    },
    {
      icon: Zap,
      title: "Business",
      description: "Ideal for simple, yet professional web presences",
      oneTime: 1490,
      annual: 390,
      features: [
        "Everything from the Starter Package",
        "Up to 7 content pages",
        "Contact form & Google Maps",
        "Newsletter integration",
        "Custom design",
        "GDPR-compliant privacy policy",
      ],
    },
    {
      icon: Crown,
      title: "E-Comm & Pro Marketing",
      description: "Ideal for simple, yet professional web presences",
      oneTime: 790,
      annual: 290,
      features: [
        "Everything from the Business Package",
        "Online shop with product management",
        "Payment & shipping solutions",
        "Marketing support & campaign track",
        "Data protection inc cookie banner",
        "Monthly reporting",
      ],
    },
  ];

  const addonServices: AddonService[] = [
    { name: "Logo Design", icons: [Heart, Zap, Crown], price: "390" },
    {
      name: "Professional copywriting",
      icons: [Heart, Zap, Crown],
      price: "120",
    },
    {
      name: "Data Protection Consult",
      icons: [Heart, Zap, Crown],
      price: "180",
    },
    { name: "Multilingual Support", icons: [Heart, Zap, Crown], price: "490" },
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
              Our Packages
            </span>
          </FadeInUp>
          <FadeInUp delay={0.4}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-grotesk text-secondary-900 tracking-tight">
              Let's build something great together
            </h2>
          </FadeInUp>
        </FadeInUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {pricingPlans.map((plan, index) => (
            <StaggerItem key={index}>
              <HoverScale>
                <Card
                  className={`bg-secondary-100 border-0 rounded-xl p-6 sm:p-8 h-auto sm:h-[785px] transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    hoveredPlan === index
                      ? "shadow-xl shadow-purple-500/10"
                      : ""
                  }`}
                  onMouseEnter={() => setHoveredPlan(index)}
                  onMouseLeave={() => setHoveredPlan(null)}
                >
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <plan.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-500" />
                    <h3 className="text-2xl sm:text-[28px] font-semibold font-grotesk whitespace-nowrap text-secondary-700">
                      {plan.title}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base font-grotesk text-secondary-400 mb-6 sm:mb-8">
                    {plan.description}
                  </p>

                  <div className="mb-4 sm:mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-3xl sm:text-4xl font-semibold font-grotesk text-secondary-700">
                        {index === 0 &&
                          animatedPrices.starterOneTime.toLocaleString()}
                        {index === 1 &&
                          animatedPrices.businessOneTime.toLocaleString()}
                        {index === 2 &&
                          animatedPrices.ecommOneTime.toLocaleString()}
                      </span>
                      <span className="text-base sm:text-lg font-grotesk text-secondary-400">
                        CHF one time
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl sm:text-4xl font-semibold font-grotesk text-secondary-700">
                        {index === 0 && animatedPrices.starterAnnual}
                        {index === 1 && animatedPrices.businessAnnual}
                        {index === 2 && animatedPrices.ecommAnnual}
                      </span>
                      <span className="text-base sm:text-lg font-grotesk text-secondary-400">
                        CHF annually
                      </span>
                    </div>
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
                    Let's start
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
              Add-on Services
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
                  <h4 className="text-lg sm:text-xl font-semibold font-grotesk text-secondary-700 mb-6 sm:mb-8">
                    {service.name}
                  </h4>
                  <div className="flex items-center justify-between">
                    <p className="text-base sm:text-lg font-grotesk text-secondary-400 mt-2">
                      Starting from:
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
