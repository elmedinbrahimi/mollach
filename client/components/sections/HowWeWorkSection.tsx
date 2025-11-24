import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animation";
import { useLanguage } from "@/contexts/LanguageContext";

interface HowWeWorkSectionProps {
  whyMollaRef: React.RefObject<HTMLDivElement>;
}

export function HowWeWorkSection({ whyMollaRef }: HowWeWorkSectionProps) {
  const { t } = useLanguage();
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
              {t("howWeWork.title")}
            </h2>
          </FadeInUp>

          <FadeInUp delay={0.4}>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {t("howWeWork.description1")}
            </p>
          </FadeInUp>

          <FadeInUp delay={0.6} className="mt-8">
            <p className="text-base text-gray-400 max-w-3xl mx-auto">
              {t("howWeWork.description2")}
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