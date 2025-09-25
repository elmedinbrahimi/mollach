import {
  FadeInUp,
  FadeInScale,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animation";
import network from "../../../assets/network.png";

interface AboutHeroSectionProps {
  heroRef: React.RefObject<HTMLDivElement>;
}

export function AboutHeroSection({ heroRef }: AboutHeroSectionProps) {
  return (
    <section
      ref={heroRef}
      className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Side - Main Heading */}
            <FadeInUp className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold font-grotesk text-secondary-900 leading-tight tracking-tight">
                We are the perfect Swiss Partner for Digital Success.
              </h1>
            </FadeInUp>

            {/* Right Side - Description */}
            <FadeInUp delay={0.2} className="space-y-4">
              <p className="text-lg font-grotesk text-secondary-400 leading-relaxed">
                At Molla, we believe that a strong digital presence is essential
                for every modern business. Based in Switzerland, we are a
                full-service digital agency offering tailored solutions for
                companies of all sizes from simple websites to scalable
                e-commerce platforms and ongoing marketing support.
              </p>
            </FadeInUp>
          </div>
        </div>
      </div>

      {/* Background Visual Element */}
      <FadeInScale delay={0.4} className="px-3">
        <div className="h-[454px] bg-black rounded-[32px] relative overflow-hidden">
          <div className="absolute inset-0">
            {/* Abstract network pattern */}
            <StaggerContainer className="absolute inset-0">
              {/* Dense pattern on the left side */}
              <StaggerItem>
                <img src={network} alt="network" className="w-full h-full" />
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </FadeInScale>
    </section>
  );
}
