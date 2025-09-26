import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
  HoverScale,
} from "@/components/ui/animation";
import { Palette, PenTool, Shield, Globe } from "lucide-react";

interface AddonService {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  price: string;
  stars: number;
  subtitle: string;
}

interface AddOnServicesSectionProps {
  addonServicesRef: React.RefObject<HTMLDivElement>;
}

export function AddOnServicesSection({ addonServicesRef }: AddOnServicesSectionProps) {
  const [animatedPrices, setAnimatedPrices] = useState({
    logo: 0,
    copywriting: 0,
    dataProtection: 0,
    multilingual: 0,
  });

  const addonServices: AddonService[] = [
    {
      name: "Logo Design",
      icon: Palette,
      price: "390",
      stars: 4,
      subtitle: "Starting from:"
    },
    {
      name: "Professional copywriting",
      icon: PenTool,
      price: "120",
      stars: 5,
      subtitle: "Starting from:"
    },
    {
      name: "Data Protection Consult",
      icon: Shield,
      price: "180",
      stars: 4,
      subtitle: "Per Hour"
    },
    {
      name: "Multilingual Support",
      icon: Globe,
      price: "490",
      stars: 4,
      subtitle: "Starting from:"
    },
  ];

  useEffect(() => {
    const animateAddonPrices = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;

        setAnimatedPrices({
          logo: Math.floor(390 * progress),
          copywriting: Math.floor(120 * progress),
          dataProtection: Math.floor(180 * progress),
          multilingual: Math.floor(490 * progress),
        });

        if (step >= steps) {
          clearInterval(timer);
          setAnimatedPrices({
            logo: 390,
            copywriting: 120,
            dataProtection: 180,
            multilingual: 490,
          });
        }
      }, stepDuration);
    };

    const timer = setTimeout(animateAddonPrices, 1000);
    return () => clearTimeout(timer);
  }, []);

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span
        key={index}
        className={`text-yellow-400 ${index < count ? 'opacity-100' : 'opacity-20'}`}
      >
        ★
      </span>
    ));
  };

  return (
    <section ref={addonServicesRef} className="py-16 sm:py-20 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-8 md:px-16">
        <FadeInUp delay={0.2}>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-grotesk text-secondary-900 tracking-tight">
              Add on Services
            </h2>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {addonServices.map((service, index) => (
            <StaggerItem key={index}>
              <HoverScale>
                <Card className="bg-secondary-100 border-0 rounded-2xl p-6 sm:p-8 hover:scale-105 transition-transform duration-300 hover:shadow-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {renderStars(service.stars)}
                    </div>
                  </div>

                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold font-grotesk text-secondary-700 mb-8">
                    {service.name}
                  </h3>

                  <div className="flex items-start justify-between">
                    <p className="text-base sm:text-lg font-grotesk text-secondary-400">
                      {service.subtitle}
                    </p>
                    <div className="text-right">
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm sm:text-base font-grotesk text-secondary-400">
                          CHF
                        </span>
                        <span className="text-3xl sm:text-4xl font-semibold font-grotesk text-secondary-700">
                          {index === 0 && animatedPrices.logo}
                          {index === 1 && animatedPrices.copywriting}
                          {index === 2 && animatedPrices.dataProtection}
                          {index === 3 && animatedPrices.multilingual}
                        </span>
                      </div>
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