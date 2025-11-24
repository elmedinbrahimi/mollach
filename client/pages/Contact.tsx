import { Header } from "@/components/Header";
import { useScrollSection } from "@/hooks/use-scroll-section";
import { Footer } from "@/components/sections/Footer";
import { ContactMainSection } from "@/components/sections/ContactMainSection";

export default function Contact() {
  const {
    isDarkBackground,
    isOverContact,
    contactFormRef,
    contactInfoRef,
  } = useScrollSection();

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Header
        isDarkBackground={isDarkBackground}
        isOverContact={isOverContact}
      />

      <ContactMainSection
        contactFormRef={contactFormRef}
        contactInfoRef={contactInfoRef}
      />
      <Footer />
    </div>
  );
}
