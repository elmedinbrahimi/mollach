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
  popular?: boolean;
}

interface ServicesPricingSectionProps {
  packagesRef: React.RefObject<HTMLDivElement>;
}

export function ServicesPricingSection({ packagesRef }: ServicesPricingSectionProps) {
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
      title: "Starter",
      description: "Ideal for basic businesses just getting started online",
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
      description: "Everything from the Starter Package",
      oneTime: 1490,
      annual: 390,
      popular: true,
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
      description: "Everything from the Business Package",
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
              Our Packages
            </span>
          </FadeInUp>
          <FadeInUp delay={0.2} className="mb-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-grotesk text-secondary-900 tracking-tight">
              Perfect for every business
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
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <plan.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-500" />
                    <h3 className="text-2xl sm:text-[28px] font-semibold font-grotesk text-secondary-700">
                      {plan.title}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base font-grotesk text-secondary-400 mb-6 sm:mb-8">
                    {plan.description}
                  </p>

                  <div className="mb-4 sm:mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-3xl sm:text-4xl font-semibold font-grotesk text-secondary-700">
                        {index === 0 && animatedPrices.starterOneTime.toLocaleString()}
                        {index === 1 && animatedPrices.businessOneTime.toLocaleString()}
                        {index === 2 && animatedPrices.ecommOneTime.toLocaleString()}
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

                  <Button className={`w-full text-white py-3 rounded-full font-grotesk mt-auto text-sm sm:text-base hover:scale-105 transition-transform duration-200 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-[#472F91] to-[#8F278F]'
                      : 'bg-gradient-to-r from-[#472F91] to-[#8F278F]'
                  }`}>
                    Get Started
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