import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animation";

export function Footer() {
  const footerLinks = {
    services: ["Blog", "Pricing", "FAQ", "Events", "Ebook & Guide"],
    socials: ["LinkedIn", "Twitter", "Instagram", "Facebook", "YouTube"],
    legal: ["Privacy Policy", "Terms & Conditions", "Cookie Policy"],
  };

  return (
    <footer className="bg-gray-50  py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-8 md:px-16">
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
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
                Your Full-Service Digital Agency in Switzerland
                <br />
                <br />
                Address:
                <br />
                Contact:
                <br />
                Phone:
              </p>
            </FadeInUp>
          </StaggerItem>

          {/* Services */}
          <StaggerItem>
            <FadeInUp delay={0.6}>
              <h4 className="text-lg sm:text-xl font-semibold font-grotesk text-secondary-500 mb-6 sm:mb-8">
                Services
              </h4>
            </FadeInUp>
            <StaggerContainer className="space-y-4 sm:space-y-6 text-red-500">
              {footerLinks.services.map((item, index) => (
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
          </StaggerItem>

          {/* Socials */}
          <StaggerItem>
            <FadeInUp delay={0.8}>
              <h4 className="text-lg sm:text-xl font-semibold font-grotesk text-secondary-500 mb-6 sm:mb-8">
                Socials
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
          </StaggerItem>
        </StaggerContainer>

        <div className="border-t border-primary-200 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              {footerLinks.legal.map((item, index) => (
                <div key={index} className="flex items-center">
                  <a
                    href="#"
                    className="text-sm sm:text-base font-grotesk text-secondary-400 hover:text-secondary-700 transition-colors duration-200"
                  >
                    {item}
                  </a>
                  {index < footerLinks.legal.length - 1 && (
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
