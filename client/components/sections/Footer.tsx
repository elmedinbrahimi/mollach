import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animation";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  const footerLinks = {
    servicesKeys: ["footer.blog", "footer.pricing", "footer.faq", "footer.events", "footer.ebook"],
    socials: ["LinkedIn", "Twitter", "Instagram", "Facebook", "YouTube"],
    legalKeys: ["footer.privacyPolicy", "footer.terms", "footer.cookiePolicy"],
  };

  return (
    <footer className="bg-gray-50  py-12 sm:pt-16">
      <div className="container mx-auto  ">
        <StaggerContainer className="flex flex-col sm:flex-row justify-between gap-8 mb-8 sm:mb-12 w-full ">
          {/* Company Info */}
          <StaggerItem className="col-span-1 sm:col-span-2 lg:col-span-2">
            <FadeInUp delay={0.2}>
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/ea272d15b7c9565581b3fa5a8e203be982913a5e?width=172"
                alt="Molla Logo"
                className="h-12 sm:h-16 w-auto mb-6 sm:mb-8"
              />
            </FadeInUp>
            <FadeInUp delay={0.4}>
              <p className="text-base sm:text-lg font-grotesk text-secondary-400 leading-relaxed max-w-sm">
                {t("footer.tagline")}
                <br />
                <br />
                {t("footer.address")}
                <br />
                {t("footer.contact")}
                <br />
                {t("footer.phone")}
              </p>
            </FadeInUp>
          </StaggerItem>

          {/* Services */}

          <StaggerItem className="flex justify-start items-start w-full  md:w-[60%]">
            <div className="w-full">
              <FadeInUp delay={0.6}>
                <h4 className="text-lg sm:text-xl font-semibold font-grotesk text-secondary-500 mb-6 sm:mb-8">
                  {t("footer.services")}
                </h4>
              </FadeInUp>
              <StaggerContainer className="space-y-4 sm:space-y-6 text-red-500">
                {footerLinks.servicesKeys.map((itemKey, index) => (
                  <StaggerItem key={index}>
                    <a
                      href="#"
                      className="block text-sm sm:text-base font-grotesk text-secondary-400 hover:text-secondary-700 transition-colors duration-200"
                    >
                      {t(itemKey)}
                    </a>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            {/* Socials */}

            <div className="w-full">
              <FadeInUp delay={0.8}>
                <h4 className="text-lg sm:text-xl font-semibold font-grotesk text-secondary-500 mb-6 sm:mb-8">
                  {t("footer.socials")}
                </h4>
              </FadeInUp>
              <StaggerContainer className="space-y-4 sm:space-y-6">
                {footerLinks.socials.map((item, index) => (
                  <StaggerItem key={index}>
                    <a
                      href="#"
                      className="block text-sm sm:text-base font-grotesk text-secondary-400 hover:text-secondary-700 transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </StaggerItem>
        </StaggerContainer>

        <div className="border-t border-primary-200 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              {footerLinks.legalKeys.map((itemKey, index) => (
                <div key={index} className="flex items-center">
                  <a
                    href="#"
                    className="text-sm sm:text-base font-grotesk text-secondary-400 hover:text-secondary-700 transition-colors duration-200"
                  >
                    {t(itemKey)}
                  </a>
                  {index < footerLinks.legalKeys.length - 1 && (
                    <span className="text-secondary-400 mx-2 sm:mx-4 hidden sm:inline">
                      |
                    </span>
                  )}
                </div>
              ))}
              <span className="text-sm sm:text-base font-grotesk text-secondary-400">
                © Molla.ch 2025
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
