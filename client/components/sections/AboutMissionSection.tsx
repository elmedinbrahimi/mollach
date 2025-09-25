import { Button } from "@/components/ui/button";
import {
  FadeInUp,
  FadeInScale,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animation";

interface AboutMissionSectionProps {
  missionRef: React.RefObject<HTMLDivElement>;
}

export function AboutMissionSection({ missionRef }: AboutMissionSectionProps) {
  return (
    <div className="p-5 md:p-8 lg:p-12">
      <section
        ref={missionRef}
        className="py-16 rounded-[30px] sm:py-20 md:py-24 relative overflow-hidden"
        style={{
          background: `
          linear-gradient(0deg, rgba(0, 0, 55, 0.4), rgba(0, 0, 55, 0.4)),
          linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
          radial-gradient(61.89% 103.18% at 53.31% 115.57%, #93278F 0%, #0D0D5D 54%, #000037 100%)
        `,
        }}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16">
          <div className="max-w-4xl mx-auto text-center text-white">
            <StaggerContainer>
              {/* Our Mission */}
              <StaggerItem>
                <FadeInUp className="mb-12">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-grotesk mb-6 tracking-tight">
                    Our Mission
                  </h2>
                  <p className="text-lg font-grotesk leading-relaxed opacity-90">
                    To help Swiss businesses grow by creating beautiful,
                    functional, and legally compliant digital experiences.
                  </p>
                </FadeInUp>
              </StaggerItem>

              {/* Our Clients */}
              <StaggerItem>
                <FadeInUp delay={0.2} className="mb-12">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-grotesk mb-6 tracking-tight">
                    Our Clients
                  </h2>
                  <p className="text-lg font-grotesk leading-relaxed opacity-90">
                    We work with startups, small businesses, and growing
                    enterprises across a variety of industries, all with one
                    goal: outstanding digital results.
                  </p>
                </FadeInUp>
              </StaggerItem>

              {/* Call to Action */}
              <StaggerItem>
                <FadeInScale delay={0.4}>
                  <Button className="bg-gradient-to-r from-[#472F91] to-[#8F278F] hover:from-[#5a3a9a] hover:to-[#a02a9a] text-white px-8 sm:px-12 py-3 rounded-full font-grotesk text-sm sm:text-base hover:scale-105 transition-transform duration-200">
                    Get Free Consultation
                  </Button>
                </FadeInScale>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </section>
    </div>
  );
}
