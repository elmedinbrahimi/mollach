import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useContactForm } from "@/hooks/use-contact-form";
import { toast } from "sonner";
import {
  StaggerContainer,
  StaggerItem,
  HoverScale,
} from "@/components/ui/animation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Sparkles, Mail, Phone, MapPin, Building2, Loader2 } from "lucide-react";

interface ContactMainSectionProps {
  contactFormRef?: React.RefObject<HTMLDivElement>;
  contactInfoRef?: React.RefObject<HTMLDivElement>;
}

export function ContactMainSection({
  contactFormRef,
  contactInfoRef,
}: ContactMainSectionProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const contactItems = [
    {
      icon: Mail,
      label: t("contactPage.additional.email"),
      value: "email@molla.ch",
      href: "mailto:email@molla.ch",
    },
    {
      icon: Phone,
      label: t("contactPage.additional.phone"),
      value: "+1283172317",
      href: "tel:+1283172317",
    },
    {
      icon: MapPin,
      label: t("contactPage.additional.office"),
      value: "Switzerland",
      href: "#",
    },
    {
      icon: Building2,
      label: t("contactPage.additional.headquarters"),
      value: "Zürich",
      href: "#",
    },
  ];

  // Contact form mutation
  const { mutate: submitForm, isPending } = useContactForm({
    onSuccess: (data) => {
      // Show success toast
      toast.success(
        data.message || t("contactPage.form.success"),
        {
          duration: 5000,
          position: "top-center",
        }
      );
      // Clear form
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    },
    onError: (error) => {
      // Show error toast
      toast.error(
        error.message || t("contactPage.form.error"),
        {
          duration: 5000,
          position: "top-center",
        }
      );
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit form via API
    submitForm(formData);
  };

  return (
    <section
      ref={contactFormRef}
      className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24"
      style={{
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%),
                    radial-gradient(85.35% 142.1% at 55.91% 154.47%, #93278F 0%, #0D0D5D 54%, #000037 100%)`,
      }}
    >
      <div className="container mx-auto ">
        {/* Top Section - Form and Text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 sm:mb-20 md:mb-24">
          {/* Left Section - Text Content */}
          <div className="space-y-6">
            <StaggerContainer className="space-y-6">
              <StaggerItem>
                <Button
                  variant="outline"
                  className="rounded-full border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 pointer-events-none"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  {t("contact.badge")}
                </Button>
              </StaggerItem>

              <StaggerItem>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white tracking-tight font-grotesk">
                  {t("contactPage.hero.title")}
                </h1>
              </StaggerItem>

              <StaggerItem>
                <p className="text-base sm:text-lg text-gray-300 max-w-xl">
                  {t("contactPage.hero.subtitle")}
                </p>
              </StaggerItem>
            </StaggerContainer>
          </div>

          {/* Right Section - Form Card */}
          <StaggerContainer>
            <StaggerItem>
              <Card className="bg-secondary-100 border-0 rounded-2xl p-6 sm:p-8 shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Row 1: Name and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-sm font-medium text-secondary-700"
                      >
                        {t("contactPage.form.name")}
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder={t("contactPage.form.namePlaceholder")}
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={isPending}
                        className="bg-white border-secondary-400/20 focus:border-primary-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-sm font-medium text-secondary-700"
                      >
                        {t("contactPage.form.phone")}
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder={t("contactPage.form.phonePlaceholder")}
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        disabled={isPending}
                        className="bg-white border-secondary-400/20 focus:border-primary-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-secondary-700"
                    >
                      {t("contactPage.form.email")}
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={t("contactPage.form.emailPlaceholder")}
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isPending}
                      className="bg-white border-secondary-400/20 focus:border-primary-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                  </div>

                  {/* Row 3: Message */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-sm font-medium text-secondary-700"
                    >
                      {t("contactPage.form.message")}
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder={t("contactPage.form.messagePlaceholder")}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      disabled={isPending}
                      className="bg-white border-secondary-400/20 focus:border-primary-500 transition-colors resize-none disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-gradient-to-r from-[#472F91] to-[#8F278F] text-white py-6 text-base rounded-full font-grotesk hover:scale-[1.02] transition-transform duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        {t("contactPage.form.sending")}
                      </>
                    ) : (
                      t("contactPage.form.send")
                    )}
                  </Button>
                </form>
              </Card>
            </StaggerItem>
          </StaggerContainer>
        </div>

        {/* Bottom Section - Additional Information */}
        <div ref={contactInfoRef}>
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-4 tracking-tight font-grotesk">
              {t("contactPage.additional.title")}
            </h2>
          </div>

          {/* Contact Items Grid */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactItems.map((item, index) => (
              <StaggerItem key={index}>
                <HoverScale>
                  <a
                    href={item.href}
                    className={item.href === "#" ? "pointer-events-none" : ""}
                  >
                    <Card className="bg-white/[7%] backdrop-blur-sm border-0 rounded-xl p-6 h-full transition-all duration-300 hover:bg-white/[12%]">
                      <div className="flex flex-col items-center text-center space-y-4">
                        {/* Icon */}
                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#472F91] to-[#8F278F] flex items-center justify-center">
                          <item.icon className="w-6 h-6 text-white" />
                        </div>

                        {/* Label */}
                        <h3 className="text-lg font-semibold text-white font-grotesk">
                          {item.label}
                        </h3>

                        {/* Value */}
                        <p className="text-sm text-gray-300">{item.value}</p>
                      </div>
                    </Card>
                  </a>
                </HoverScale>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
