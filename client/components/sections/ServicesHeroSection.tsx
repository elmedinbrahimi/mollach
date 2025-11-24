import { Button } from "@/components/ui/button";
import {
  FadeInUp,
  FadeInScale,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animation";
import { useLanguage } from "@/contexts/LanguageContext";

interface ServicesHeroSectionProps {
  heroRef: React.RefObject<HTMLDivElement>;
}

export function ServicesHeroSection({ heroRef }: ServicesHeroSectionProps) {
  const { t } = useLanguage();
  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center w-screen  py-20 px-4 sm:px-8 md:px-16 bg-white relative overflow-hidden"
    >
      <div className="container w-full !mx-0 ">
        <div className="grid grid-cols-1 w-full lg:grid-cols-3 gap-8 lg:gap-12 items-end">
          {/* Left Image */}
          <div className="order-2  lg:order-1">
            <FadeInScale delay={0.6}>
              <div className="bg-gray-100 abs rounded-[32px] overflow-hidden shadow-lg h-[300px] sm:h-[400px]">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=400&fit=crop"
                  alt="Team working on laptop"
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeInScale>
          </div>

          {/* Center Content */}
          <div className="order-1 lg:order-2 w-full text-center space-y-6">
            <FadeInUp delay={0.2}>
              <div className="bg-gradient-to-r from-primary-500 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-medium w-fit mx-auto flex items-center gap-2">
                <span className="text-white">✨</span>
                Services
              </div>
            </FadeInUp>

            <FadeInUp delay={0.4}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-grotesk text-secondary-900 leading-tight">
                {t("servicesHero.title")}
                <br />
                <span className="text-secondary-700 relative">
                  {t("servicesHero.subtitle")}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full"></div>
                </span>
              </h1>
            </FadeInUp>

            <FadeInUp delay={0.6}>
              <p className="text-lg text-secondary-400 max-w-2xl mx-auto leading-relaxed">
                Develop essential skills with expert-led courses in AI, ML, data
                science, and more. Learn at your own pace, anytime
              </p>
            </FadeInUp>

            <FadeInUp delay={0.8}>
              <Button className="bg-gradient-to-r from-[#472F91] to-[#8F278F] text-white px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform duration-200 text-lg">
                {t("servicesHero.cta")}
              </Button>
            </FadeInUp>
          </div>

          {/* Right Image */}
          <div className="order-3 lg:order-3">
            <FadeInScale delay={0.8}>
              <div className="bg-gray-100 rounded-[32px] overflow-hidden shadow-lg h-[300px] sm:h-[400px]">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=400&fit=crop"
                  alt="Digital analytics dashboard"
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeInScale>
          </div>
        </div>
      </div>
    </section>
  );
}
