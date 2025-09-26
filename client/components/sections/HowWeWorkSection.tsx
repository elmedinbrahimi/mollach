import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animation";

interface HowWeWorkSectionProps {
  whyMollaRef: React.RefObject<HTMLDivElement>;
}

export function HowWeWorkSection({ whyMollaRef }: HowWeWorkSectionProps) {
  return (
    <section
      ref={whyMollaRef}
      className="pt-20 pb-0 bg-secondary-900 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-8 md:px-16">
        {/* Header */}
        <div className="text-center mb-20">
          <FadeInUp delay={0.2}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-grotesk text-white mb-6">
              How we work
            </h2>
          </FadeInUp>

          <FadeInUp delay={0.4}>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
              At Molla.ch, we offer comprehensive digital services designed to help your business stand out online. Whether
              you need a modern website, a secure online shop, impactful marketing campaigns, or expert data protection
              support - we provide solutions that are fully adapted to your needs and compliant with Swiss standards.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.6} className="mt-8">
            <p className="text-base text-gray-400 max-w-3xl mx-auto">
              We follow a holistic approach from strategy and design to execution and ongoing support. Our team
              ensures every solution is not only visually impressive but also functional, scalable, and results-driven.
            </p>
          </FadeInUp>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-400 rounded-full blur-2xl"></div>
        </div>
      </div>
    </section>
  );
}