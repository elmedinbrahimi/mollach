import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animation";
import { useState, useEffect } from "react";

interface AboutStatsSectionProps {
  statsRef: React.RefObject<HTMLDivElement>;
}

export function AboutStatsSection({ statsRef }: AboutStatsSectionProps) {
  const [animatedStats, setAnimatedStats] = useState({
    projects: 0,
    users: 0,
    services: 0,
  });

  const stats = [
    {
      value: 100,
      suffix: "+",
      label: "Successful projects",
    },
    {
      value: 500,
      suffix: "K+",
      label: "Active Users",
    },
    {
      value: 10,
      suffix: "+",
      label: "Services provided",
    },
  ];

  useEffect(() => {
    // Animate stats counter
    const animateStats = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;

        setAnimatedStats({
          projects: Math.floor(100 * progress),
          users: Math.floor(500 * progress),
          services: Math.floor(10 * progress),
        });

        if (step >= steps) {
          clearInterval(timer);
          setAnimatedStats({ projects: 100, users: 500, services: 10 });
        }
      }, stepDuration);
    };

    const timer = setTimeout(animateStats, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={statsRef} className="py-16 sm:py-20 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-8 md:px-16">
        <StaggerContainer className="grid md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <StaggerItem key={index}>
              <div className="space-y-2">
                <h3 className="text-4xl md:text-5xl font-semibold font-grotesk text-secondary-900">
                  {index === 0 && animatedStats.projects}
                  {index === 1 && animatedStats.users}
                  {index === 2 && animatedStats.services}
                  {stat.suffix}
                </h3>
                <p className="text-lg font-grotesk text-secondary-400">
                  {stat.label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
