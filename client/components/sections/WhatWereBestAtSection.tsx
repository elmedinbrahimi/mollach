import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
  HoverScale,
} from "@/components/ui/animation";
import {
  Monitor,
  ShoppingBag,
  Palette,
  TrendingUp,
  FileText,
  ExternalLink,
} from "lucide-react";

interface WhatWereBestAtSectionProps {
  servicesRef: React.RefObject<HTMLDivElement>;
}

interface ServiceCard {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradient: string;
}

export function WhatWereBestAtSection({
  servicesRef,
}: WhatWereBestAtSectionProps) {
  const services: ServiceCard[] = [
    {
      icon: Monitor,
      title: "Professional Web Design",
      description:
        "Swiss market knowledge and legally compliant implementation",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: ShoppingBag,
      title: "Online Shops & Digital Marketing",
      description:
        "Swiss market knowledge and legally compliant implementation",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: Palette,
      title: "Creative Graphic Design",
      description:
        "Swiss market knowledge and legally compliant implementation",
      gradient: "from-pink-500 to-pink-600",
    },
    {
      icon: TrendingUp,
      title: "Email Marketing Campaign Management",
      description:
        "Swiss market knowledge and legally compliant implementation",
      gradient: "from-green-500 to-green-600",
    },
    {
      icon: FileText,
      title: "Data Protection & Legal Consulting",
      description:
        "Swiss market knowledge and legally compliant implementation",
      gradient: "from-indigo-500 to-indigo-600",
    },
  ];

  return (
    <section
      ref={servicesRef}
      className="pt-0 pb-20 bg-secondary-900 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-8 md:px-16">
        {/* Header */}
        <div className="text-center mb-16 pt-16">
          <FadeInUp delay={0.2}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-grotesk text-white mb-8">
              What we're the best at
            </h2>
          </FadeInUp>
        </div>

        {/* Services Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.slice(0, 4).map((service, index) => (
            <StaggerItem key={index}>
              <HoverScale>
                <Card className="bg-secondary-700/50 backdrop-blur-sm border border-secondary-500/20 rounded-2xl p-8 h-full hover:bg-secondary-600/50 transition-all duration-300 group transform-gpu">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold font-grotesk text-white mb-4 group-hover:text-primary-200 transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-gray-300 text-base leading-relaxed">
                    Swiss market knowledge and legally compliant implementation
                  </p>
                </Card>
              </HoverScale>
            </StaggerItem>
          ))}

          {/* Fifth Service - Data Protection (spans 2 columns on large screens) */}
          <StaggerItem className="md:col-span-2 lg:col-span-1">
            <HoverScale>
              <Card className="bg-secondary-700/50 backdrop-blur-sm border border-secondary-500/20 rounded-2xl p-8 h-full hover:bg-secondary-600/50 transition-all duration-300 group transform-gpu">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${services[4].gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {React.createElement(services[4].icon, {
                    className: "w-8 h-8 text-white",
                  })}
                </div>

                <h3 className="text-xl font-bold font-grotesk text-white mb-4 group-hover:text-primary-200 transition-colors duration-300">
                  {services[4].title}
                </h3>

                <p className="text-gray-300 text-base leading-relaxed">
                  {services[4].description}
                </p>
              </Card>
            </HoverScale>
          </StaggerItem>

          {/* Looking for more card */}
          <StaggerItem>
            <HoverScale>
              <Card className="bg-secondary-700/50 backdrop-blur-sm border border-secondary-500/20 rounded-2xl p-8 h-full hover:bg-secondary-600/50 transition-all duration-300 group transform-gpu">
                <h3 className="text-2xl font-bold font-grotesk text-white mb-4">
                  Looking for more?
                </h3>

                <p className="text-white/90 text-base mb-6 max-w-md">
                  Looking for something else? We have a lot of expertise in
                  different areas. So feel free to reach out!
                </p>

                <Button
                  variant="outline"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary hover:bg-primary/90 h-10 bg-gradient-to-r from-[#472F91] to-[#8F278F] text-white px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform duration-200 text-lg border-0"
                >
                  Get A Free Consultation
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Card>
            </HoverScale>
          </StaggerItem>
        </StaggerContainer>

        {/* Contact Now Button */}
        <div className="text-center">
          <FadeInUp delay={0.8}>
            <Button className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary hover:bg-primary/90 h-10 bg-gradient-to-r from-[#472F91] to-[#8F278F] text-white px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform duration-200 text-lg">
              Contact Now
            </Button>
          </FadeInUp>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-[20%] w-[600px] h-[600px] bg-gradient-to-r from-[#472F91] to-[#8F278F] rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-[50%] w-40 h-40 bg-gradient-to-r from-[#472F91] to-[#8F278F] rounded-full blur-2xl"></div>
          <div className="absolute top-0 left-[-100%] w-24 h-24 bg-gradient-to-r from-[#472F91] to-[#8F278F] rounded-full blur-2xl"></div>
        </div>
      </div>
    </section>
  );
}
