import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "de" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: React.ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(() => {
    // Check localStorage first, then browser language, default to English
    const saved = localStorage.getItem("molla-language") as Language;
    if (saved && (saved === "de" || saved === "en")) {
      return saved;
    }

    // Check browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("de")) {
      return "de";
    }

    return "en";
  });

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem("molla-language", language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    const translations = getTranslations(language);
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// Translation data
function getTranslations(lang: Language) {
  const translations = {
    de: {
      // Hero Section
      "hero.badge": "Molla – Digitale Lösungen für die Zukunft",
      "hero.title": "Molla – Digitale Lösungen für die Zukunft",
      "hero.subtitle":
        "Wir entwickeln Plattformen und Next-Gen-Lösungen , die Ihr Unternehmen in die digitale Zukunft führen. Ergänzt durch Innovation Labs und Sicherheitslösungen schaffen wir Mehrwert auf allen Ebenen.",
      "hero.cta": "Kostenlose Beratung",
      "hero.stats.services": "Kernleistungen",
      "hero.stats.lab": "Innovation Lab",
      "hero.stats.quality": "Schweizer Qualität",

      // Services Section
      "services.badge": "Unsere Dienstleistungen",
      "services.title": "Digitale Lösungen für morgen",
      "services.platforms.title": "📡 Plattformen",
      "services.platforms.desc":
        "Massgeschneiderte digitale Plattformen und websites, die Unternehmen, Kunden und Partner verbinden - skalierbar und zukunftssicher.",
      "services.solutions.title": "💡 Digitale Lösungen",
      "services.solutions.desc":
        "Innovative Technologien wie Automatisierung, KI und datengetriebene Geschäftsmodelle, die Prozesse revolutionieren.",
      "services.lab.title": "🧪 Innovation Lab",
      "services.lab.desc":
        "Wir experimentieren mit disruptiven Ansätzen und entwickeln Zukunftskonzepte, die heute schon erlebbar sind.",
      "services.partnerships.title": "🤝 Partnerschaften",
      "services.partnerships.desc":
        "Innovation gelingt im Netzwerk. Wir schaffen Verbindungen und bauen starke Partnerschaften auf, die Mehrwert erzeugen.",
      "services.security.title": "🛡️ Sicherheit & Verteidigung",
      "services.security.desc":
        "Der Ausfall kritischer Infrastrukturen kann gravierende Folgen haben. Unsere Drohnenabwehrsysteme gewährleisten den zuverlässigen Schutz solcher Anlagen.",
      "services.cta.title": "Suchen Sie mehr?",
      "services.cta.desc":
        "Suchen Sie etwas anderes? Wir haben viel Expertise in verschiedenen Bereichen, also zögern Sie nicht, uns zu kontaktieren!",
      "services.cta.button": "Kostenlose Beratung erhalten",

      // About Section
      "about.badge": "Über uns",
      "about.title": "Führende digitale Innovation",
      "about.competence.title": "Digitale Kompetenz",
      "about.competence.desc":
        "Molla steht für digitale Kompetenz und ganzheitliche Lösungen. Unser Anspruch ist es, Unternehmen nicht nur bei der Digitalisierung zu begleiten, sondern sie aktiv in die Zukunft zu führen.",
      "about.team.title": "Taskforce",
      "about.team.desc":
        "Mit einem Team aus Spezialisten für Plattformen, Technologie, Sicherheit und Innovation schaffen wir die Brücke zwischen heute und morgen.",
      "about.implementation.title": "Kreative Umsetzung",
      "about.implementation.desc":
        "Wir verbinden kreatives Denken mit praktischer Umsetzungskraft - für Ergebnisse, die Wirkung zeigen.",

      // Contact Section
      "contact.badge": "Kontakt",
      "contact.title": "Bereit für die nächste Stufe?",
      "contact.subtitle": "Kontaktieren Sie uns für eine persönliche Beratung.",
      "contact.email": "✉️ info@molla.ch",
      "contact.phone": "☎️ +41 71 911 90 00",
      "contact.location": "📍 Schweiz",
      "contact.cta": "Kostenlose Beratung erhalten",

      // Contact Page
      "contactPage.hero.title": "Kontaktieren Sie uns! Wir freuen uns auf Sie!",
      "contactPage.hero.subtitle":
        "Haben Sie eine Frage, benötigen Sie ein Angebot oder möchten Sie über Ihre digitalen Ziele sprechen? Wir sind hier, um Ihnen zu helfen. Kontaktieren Sie uns für eine kostenlose, unverbindliche Beratung – wir melden uns so schnell wie möglich bei Ihnen zurück.",
      "contactPage.form.name": "Name",
      "contactPage.form.namePlaceholder": "John",
      "contactPage.form.phone": "Telefonnummer",
      "contactPage.form.phonePlaceholder": "+1293123",
      "contactPage.form.email": "E-Mail-Adresse",
      "contactPage.form.emailPlaceholder": "hello@gmail.com",
      "contactPage.form.message": "Wie können wir helfen?",
      "contactPage.form.messagePlaceholder": "Ihre Nachricht",
      "contactPage.form.send": "Senden",
      "contactPage.form.sending": "Wird gesendet...",
      "contactPage.form.success":
        "Nachricht erfolgreich gesendet! Wir werden uns bald bei Ihnen melden.",
      "contactPage.form.error":
        "Beim Senden der Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.",
      "contactPage.additional.title": "Zusätzliche Informationen",
      "contactPage.additional.email": "email@molla.ch",
      "contactPage.additional.phone": "+1283172317",
      "contactPage.additional.office": "Bürostandort",
      "contactPage.additional.headquarters": "Hauptsitz",

      // Services Hero Section
      "servicesHero.title": "Massgeschneiderte digitale Dienstleistungen",
      "servicesHero.subtitle": "für Schweizer Unternehmen",
      "servicesHero.cta": "Jetzt eine kostenlose Beratung erhalten",

      // How We Work Section
      "howWeWork.title": "Wie wir arbeiten",
      "howWeWork.description1":
        "Bei Molla bieten wir ganzheitliche digitale Dienstleistungen, die Ihr Unternehmen online sichtbar, professionell und zukunftssicher machen. Ob moderne Website, leistungsstarker Online-Shop, wirkungsvolle Marketingkampagnen oder fundierte Unterstützung im Datenschutz - wir entwickeln Lösungen, die exakt auf Ihre Bedürfnisse abgestimmt sind und den Schweizer Standards entsprechen.",
      "howWeWork.description2":
        "Unser Ansatz ist vollständig integriert: von der strategischen Planung über Design und Umsetzung bis hin zur laufenden Betreuung. Wir sorgen dafür, dass jede Lösung nicht nur ästhetisch überzeugt, sondern auch technisch ausgereift, skalierbar und auf messbare Ergebnisse ausgerichtet ist.",

      // What We're Best At Section
      "bestAt.title": "Worin wir am besten sind",
      "bestAt.service1.title": "Professionelles Webdesign",
      "bestAt.service1.description":
        "Schweizer Marktkenntnisse und rechtskonforme Umsetzung",
      "bestAt.service2.title": "Online-Shops & Digitales Marketing",
      "bestAt.service2.description":
        "Schweizer Marktkenntnisse und rechtskonforme Umsetzung",
      "bestAt.service3.title": "Kreatives Grafikdesign",
      "bestAt.service3.description":
        "Schweizer Marktkenntnisse und rechtskonforme Umsetzung",
      "bestAt.service4.title": "E-Mail-Marketing Kampagnenmanagement",
      "bestAt.service4.description":
        "Schweizer Marktkenntnisse und rechtskonforme Umsetzung",
      "bestAt.service5.title": "Datenschutz & Rechtsberatung",
      "bestAt.service5.description":
        "Schweizer Marktkenntnisse und rechtskonforme Umsetzung",
      "bestAt.lookingForMore.title": "Suchen Sie mehr?",
      "bestAt.lookingForMore.description":
        "Suchen Sie etwas anderes? Wir haben viel Expertise in verschiedenen Bereichen. Zögern Sie also nicht, uns zu kontaktieren!",
      "bestAt.lookingForMore.cta": "Kostenlose Beratung erhalten",
      "bestAt.contactNow": "Jetzt kontaktieren",

      // Services Pricing Section
      "servicesPricing.badge": "Unsere Pakete",
      "servicesPricing.title": "Perfekt für jedes Unternehmen",
      "servicesPricing.mostPopular": "Beliebtestes",
      "servicesPricing.oneTime": "CHF einmalig",
      "servicesPricing.annually": "CHF jährlich",
      "servicesPricing.getStarted": "Jetzt starten",

      "servicesPricing.starter.title": "Starter",
      "servicesPricing.starter.description": "Ideal für kleine Unternehmen, die gerade erst online starten",
      "servicesPricing.starter.feature1": "Bis zu 3 Inhaltsseiten",
      "servicesPricing.starter.feature2": "Responsives Design",
      "servicesPricing.starter.feature3": "4 lizenzfreie Bilder",
      "servicesPricing.starter.feature4": "4 Inhaltsaktualisierungen pro Jahr",
      "servicesPricing.starter.feature5": ".ch-Domain mit SSL",
      "servicesPricing.starter.feature6": "Basis-SEO",

      "servicesPricing.business.title": "Business",
      "servicesPricing.business.description": "Alles aus dem Starter-Paket",
      "servicesPricing.business.feature1": "Alles aus dem Starter-Paket",
      "servicesPricing.business.feature2": "Bis zu 7 Inhaltsseiten",
      "servicesPricing.business.feature3": "Kontaktformular & Google Maps",
      "servicesPricing.business.feature4": "Newsletter-Integration",
      "servicesPricing.business.feature5": "Individuelles Design",
      "servicesPricing.business.feature6": "DSGVO-konforme Datenschutzerklärung",

      "servicesPricing.ecomm.title": "E-Comm & Pro Marketing",
      "servicesPricing.ecomm.description": "Alles aus dem Business-Paket",
      "servicesPricing.ecomm.feature1": "Alles aus dem Business-Paket",
      "servicesPricing.ecomm.feature2": "Online-Shop mit Produktverwaltung",
      "servicesPricing.ecomm.feature3": "Zahlungs- & Versandlösungen",
      "servicesPricing.ecomm.feature4": "Marketing-Support & Kampagnen-Tracking",
      "servicesPricing.ecomm.feature5": "Datenschutz inkl. Cookie-Banner",
      "servicesPricing.ecomm.feature6": "Monatliches Reporting",

      // Add On Services Section
      "addOnServices.title": "Zusätzliche Dienstleistungen",
      "addOnServices.service1.name": "Logo-Design",
      "addOnServices.service1.subtitle": "Ab:",
      "addOnServices.service2.name": "Professionelles Copywriting",
      "addOnServices.service2.subtitle": "Ab:",
      "addOnServices.service3.name": "Datenschutzberatung",
      "addOnServices.service3.subtitle": "Pro Stunde",
      "addOnServices.service4.name": "Mehrsprachiger Support",
      "addOnServices.service4.subtitle": "Ab:",

      // Footer
      "footer.tagline": "Ihre Full-Service Digitalagentur in der Schweiz",
      "footer.address": "Adresse:",
      "footer.contact": "Kontakt:",
      "footer.phone": "Telefon:",
      "footer.services": "Dienstleistungen",
      "footer.socials": "Soziale Medien",
      "footer.blog": "Blog",
      "footer.pricing": "Preise",
      "footer.faq": "FAQ",
      "footer.events": "Veranstaltungen",
      "footer.ebook": "E-Book & Leitfaden",
      "footer.privacyPolicy": "Datenschutzerklärung",
      "footer.terms": "AGB",
      "footer.cookiePolicy": "Cookie-Richtlinie",

      // Navigation
      "nav.home": "Startseite",
      "nav.about": "Über uns",
      "nav.services": "Dienstleistungen",
      "nav.contact": "Kontakt",
      "nav.contactUs": "Kontaktieren Sie uns",

      // Common
      "common.menu": "Menü",

      // Pricing Section
      "pricing.badge": "Unsere Pakete",
      "pricing.title": "Lassen Sie uns gemeinsam etwas Großartiges schaffen",

      // Starter Package
      "pricing.starter.title": "Starter-Paket",
      "pricing.starter.description": "Ideal für einfache, aber professionelle Webauftritte",
      "pricing.starter.oneTime": "Einmalig",
      "pricing.starter.annual": "Jährlich",
      "pricing.starter.feature1": "Bis zu 3 Inhaltsseiten",
      "pricing.starter.feature1.detail": "(z. B. Startseite, Über uns, Kontakt)",
      "pricing.starter.feature2": "Responsives Webdesign",
      "pricing.starter.feature2.detail": "(optimiert für Desktop, Tablet und Smartphone)",
      "pricing.starter.feature3": "4 lizenzfreie Bilder",
      "pricing.starter.feature3.detail": "(professionelle Auswahl aus Bilddatenbanken)",
      "pricing.starter.feature4": "4 Inhaltsaktualisierungen pro Jahr",
      "pricing.starter.feature4.detail": "(Text- oder Bildänderungen inklusive)",
      "pricing.starter.feature5": ".ch-Domain inklusive",
      "pricing.starter.feature5.detail": "(Registrierung & Einrichtung enthalten)",
      "pricing.starter.feature6": "SSL-Zertifikat",
      "pricing.starter.feature6.detail": "(sichere HTTPS-Verbindung)",
      "pricing.starter.feature7": "Basis-SEO",
      "pricing.starter.feature7.detail": "(Grundoptimierung für Suchmaschinen)",

      // Business Package
      "pricing.business.title": "Business-Paket",
      "pricing.business.description": "Ideal für wachsende Unternehmen mit höheren Ansprüchen",
      "pricing.business.feature1": "Alles aus dem Starter-Paket",
      "pricing.business.feature2": "Bis zu 7 Inhaltsseiten",
      "pricing.business.feature3": "Kontaktformular & Google Maps Integration",
      "pricing.business.feature4": "Newsletter-Integration",
      "pricing.business.feature4.detail": "(z. B. Mailchimp, Brevo)",
      "pricing.business.feature5": "Individuelles Design-Konzept passend zur Markenidentität",
      "pricing.business.feature6": "DSGVO-konforme Datenschutzerklärung",
      "pricing.business.feature7": "Responsives Design für alle Geräte",
      "pricing.business.feature8": "Erweiterte SEO-Grundoptimierung",

      // E-Commerce Package
      "pricing.ecomm.title": "Premium-Paket – E-Commerce & Pro Marketing",
      "pricing.ecomm.description": "Ideal für Unternehmen, die online verkaufen und ihr Marketing professionell ausbauen möchten",
      "pricing.ecomm.feature1": "Alles aus dem Business-Paket",
      "pricing.ecomm.feature2": "Online-Shop mit Produktverwaltung",
      "pricing.ecomm.feature2.detail": "(Produktkatalog, Warenkorb, Bestell- und Kundenverwaltung)",
      "pricing.ecomm.feature3": "Zahlungs- & Versandlösungen",
      "pricing.ecomm.feature3.detail": "(Twint, Kreditkarte, PayPal, PostFinance, Abholung etc.)",
      "pricing.ecomm.feature4": "Marketing-Support & Kampagnen-Tracking",
      "pricing.ecomm.feature4.detail": "(Google Ads, Social Media, Newsletter-Automatisierung)",
      "pricing.ecomm.feature5": "Datenschutz & Cookie-Banner",
      "pricing.ecomm.feature5.detail": "gemäss DSGVO und Schweizer Datenschutzgesetz",
      "pricing.ecomm.feature6": "Monatliches Reporting zur Website-Performance",
      "pricing.ecomm.feature7": "Priorisierter Support bei technischen oder inhaltlichen Anpassungen",
      "pricing.ecomm.customizable": "Dieses Paket ist individuell anpassbar.",
      "pricing.ecomm.priceOnRequest": "Preis & Leistungsumfang auf Anfrage.",
      "pricing.ecomm.cta": "Jetzt unverbindlich anfragen",

      // Add-on Services
      "pricing.addons.title": "Zusätzliche Dienstleistungen",
      "pricing.addons.logoDesign": "Logo-Design",
      "pricing.addons.copywriting": "Professionelles Copywriting",
      "pricing.addons.dataProtection": "Datenschutzberatung",
      "pricing.addons.multilingual": "Mehrsprachiger Support",
      "pricing.addons.startingFrom": "Ab:",

      // CTA
      "pricing.cta": "Los geht's",
    },
    en: {
      // Hero Section
      "hero.badge": "Molla – Digitale Lösungen für die Zukunft",
      "hero.title": "Molla – Digital Solutions for the Future",
      "hero.subtitle":
        "We create platforms, next-gen solutions, and partnerships that lead your business into the digital era. With our innovation labs and security services, we deliver value at every level.",
      "hero.cta": "Get a free consultation",
      "hero.stats.services": "Core Services",
      "hero.stats.lab": "Innovation Lab",
      "hero.stats.quality": "Swiss Quality",

      // Services Section
      "services.badge": "Our Services",
      "services.title": "Digital Solutions for Tomorrow",
      "services.platforms.title": "📡 Platforms",
      "services.platforms.desc":
        "Tailor-made digital platforms connecting companies, customers, and partners – scalable and future-proof.",
      "services.solutions.title": "💡 Digital Solutions",
      "services.solutions.desc":
        "Innovative technologies such as automation, AI, and data-driven models that revolutionize processes.",
      "services.lab.title": "🧪 Innovation Lab",
      "services.lab.desc":
        "We experiment with disruptive approaches and create future concepts that can be experienced today.",
      "services.partnerships.title": "🤝 Network & Partnerships",
      "services.partnerships.desc":
        "Innovation thrives in networks. We create connections and build strong partnerships that generate real value.",
      "services.security.title": "🛡️ Security & Defense",
      "services.security.desc":
        "The failure of critical infrastructures can have severe consequences. Our drone defense systems reliably secure large areas and protect multiple sites centrally.",
      "services.cta.title": "Looking for more?",
      "services.cta.desc":
        "Looking for something else? We have a lot of expertise in different areas, so feel free to reach out!",
      "services.cta.button": "Get a free consultation",

      // About Section
      "about.badge": "About Us",
      "about.title": "Leading Digital Innovation",
      "about.competence.title": "Digital Competence",
      "about.competence.desc":
        "Molla stands for digital competence and holistic solutions. Our mission is not only to support companies in their digital journey but to actively lead them into the future.",
      "about.team.title": "Specialist Team",
      "about.team.desc":
        "With a team of specialists in platforms, technology, security, and innovation, we bridge the gap between today and tomorrow.",
      "about.implementation.title": "Creative Implementation",
      "about.implementation.desc":
        "We combine creative thinking with practical implementation power – delivering results that make an impact.",

      // Contact Section
      "contact.badge": "Contact",
      "contact.title": "Ready for the next level?",
      "contact.subtitle": "Get in touch with us for a personal consultation.",
      "contact.email": "✉️ info@molla.ch",
      "contact.phone": "☎️ +41 71 911 90 00",
      "contact.location": "📍 Switzerland",
      "contact.cta": "Get free consultation",

      // Contact Page
      "contactPage.hero.title": "Get in touch! We'd love to meet you!",
      "contactPage.hero.subtitle":
        "Have a question, need a quote, or want to talk about your digital goals? We're here to help. Reach out to us for a free, no-obligation consultation — we'll get back to you as soon as possible.",
      "contactPage.form.name": "Name",
      "contactPage.form.namePlaceholder": "John",
      "contactPage.form.phone": "Phone number",
      "contactPage.form.phonePlaceholder": "+1293123",
      "contactPage.form.email": "Email Address",
      "contactPage.form.emailPlaceholder": "hello@gmail.com",
      "contactPage.form.message": "How can we help?",
      "contactPage.form.messagePlaceholder": "Your Message",
      "contactPage.form.send": "Send",
      "contactPage.form.sending": "Sending...",
      "contactPage.form.success":
        "Message sent successfully! We'll get back to you soon.",
      "contactPage.form.error":
        "An error occurred while sending your message. Please try again later.",
      "contactPage.additional.title": "Additional Information",
      "contactPage.additional.email": "email@molla.ch",
      "contactPage.additional.phone": "+1283172317",
      "contactPage.additional.office": "Office Location",
      "contactPage.additional.headquarters": "Headquarters location",

      // Services Hero Section
      "servicesHero.title": "Tailored Digital Services",
      "servicesHero.subtitle": "for Swiss Businesses",
      "servicesHero.cta": "Get A Free Consultation",

      // How We Work Section
      "howWeWork.title": "How we work",
      "howWeWork.description1":
        "At Molla, we offer comprehensive digital services designed to help your business stand out online. Whether you need a modern website, a secure online shop, impactful marketing campaigns, or expert data protection support - we provide solutions that are fully adapted to your needs and compliant with Swiss standards.",
      "howWeWork.description2":
        "We follow a holistic approach from strategy and design to execution and ongoing support. Our team ensures every solution is not only visually impressive but also functional, scalable, and results-driven.",

      // What We're Best At Section
      "bestAt.title": "What we're the best at",
      "bestAt.service1.title": "Professional Web Design",
      "bestAt.service1.description":
        "Swiss market knowledge and legally compliant implementation",
      "bestAt.service2.title": "Online Shops & Digital Marketing",
      "bestAt.service2.description":
        "Swiss market knowledge and legally compliant implementation",
      "bestAt.service3.title": "Creative Graphic Design",
      "bestAt.service3.description":
        "Swiss market knowledge and legally compliant implementation",
      "bestAt.service4.title": "Email Marketing Campaign Management",
      "bestAt.service4.description":
        "Swiss market knowledge and legally compliant implementation",
      "bestAt.service5.title": "Data Protection & Legal Consulting",
      "bestAt.service5.description":
        "Swiss market knowledge and legally compliant implementation",
      "bestAt.lookingForMore.title": "Looking for more?",
      "bestAt.lookingForMore.description":
        "Looking for something else? We have a lot of expertise in different areas. So feel free to reach out!",
      "bestAt.lookingForMore.cta": "Get A Free Consultation",
      "bestAt.contactNow": "Contact Now",

      // Services Pricing Section
      "servicesPricing.badge": "Our Packages",
      "servicesPricing.title": "Perfect for every business",
      "servicesPricing.mostPopular": "Most Popular",
      "servicesPricing.oneTime": "CHF one time",
      "servicesPricing.annually": "CHF annually",
      "servicesPricing.getStarted": "Get Started",

      "servicesPricing.starter.title": "Starter",
      "servicesPricing.starter.description": "Ideal for basic businesses just getting started online",
      "servicesPricing.starter.feature1": "Up to 3 content pages",
      "servicesPricing.starter.feature2": "Responsive design",
      "servicesPricing.starter.feature3": "4 royalty-free images",
      "servicesPricing.starter.feature4": "4 content updates per year",
      "servicesPricing.starter.feature5": ".ch domain with SSL",
      "servicesPricing.starter.feature6": "Basic SEO",

      "servicesPricing.business.title": "Business",
      "servicesPricing.business.description": "Everything from the Starter Package",
      "servicesPricing.business.feature1": "Everything from the Starter Package",
      "servicesPricing.business.feature2": "Up to 7 content pages",
      "servicesPricing.business.feature3": "Contact form & Google Maps",
      "servicesPricing.business.feature4": "Newsletter integration",
      "servicesPricing.business.feature5": "Custom design",
      "servicesPricing.business.feature6": "GDPR-compliant privacy policy",

      "servicesPricing.ecomm.title": "E-Comm & Pro Marketing",
      "servicesPricing.ecomm.description": "Everything from the Business Package",
      "servicesPricing.ecomm.feature1": "Everything from the Business Package",
      "servicesPricing.ecomm.feature2": "Online shop with product management",
      "servicesPricing.ecomm.feature3": "Payment & shipping solutions",
      "servicesPricing.ecomm.feature4": "Marketing support & campaign track",
      "servicesPricing.ecomm.feature5": "Data protection inc cookie banner",
      "servicesPricing.ecomm.feature6": "Monthly reporting",

      // Add On Services Section
      "addOnServices.title": "Add on Services",
      "addOnServices.service1.name": "Logo Design",
      "addOnServices.service1.subtitle": "Starting from:",
      "addOnServices.service2.name": "Professional copywriting",
      "addOnServices.service2.subtitle": "Starting from:",
      "addOnServices.service3.name": "Data Protection Consult",
      "addOnServices.service3.subtitle": "Per Hour",
      "addOnServices.service4.name": "Multilingual Support",
      "addOnServices.service4.subtitle": "Starting from:",

      // Footer
      "footer.tagline": "Your Full-Service Digital Agency in Switzerland",
      "footer.address": "Address:",
      "footer.contact": "Contact:",
      "footer.phone": "Phone:",
      "footer.services": "Services",
      "footer.socials": "Socials",
      "footer.blog": "Blog",
      "footer.pricing": "Pricing",
      "footer.faq": "FAQ",
      "footer.events": "Events",
      "footer.ebook": "Ebook & Guide",
      "footer.privacyPolicy": "Privacy Policy",
      "footer.terms": "Terms & Conditions",
      "footer.cookiePolicy": "Cookie Policy",

      // Navigation
      "nav.home": "Home",
      "nav.about": "About",
      "nav.services": "Services",
      "nav.contact": "Contact",
      "nav.contactUs": "Contact us",

      // Common
      "common.menu": "Menu",

      // Pricing Section
      "pricing.badge": "Our Packages",
      "pricing.title": "Let's build something great together",

      // Starter Package
      "pricing.starter.title": "Starter Package",
      "pricing.starter.description": "Ideal for simple, yet professional web presences",
      "pricing.starter.oneTime": "One time",
      "pricing.starter.annual": "Annually",
      "pricing.starter.feature1": "Up to 3 content pages",
      "pricing.starter.feature1.detail": "(e.g., Home, About, Contact)",
      "pricing.starter.feature2": "Responsive web design",
      "pricing.starter.feature2.detail": "(optimized for desktop, tablet, and smartphone)",
      "pricing.starter.feature3": "4 royalty-free images",
      "pricing.starter.feature3.detail": "(professional selection from image databases)",
      "pricing.starter.feature4": "4 content updates per year",
      "pricing.starter.feature4.detail": "(text or image changes included)",
      "pricing.starter.feature5": ".ch domain included",
      "pricing.starter.feature5.detail": "(registration & setup included)",
      "pricing.starter.feature6": "SSL certificate",
      "pricing.starter.feature6.detail": "(secure HTTPS connection)",
      "pricing.starter.feature7": "Basic SEO",
      "pricing.starter.feature7.detail": "(basic search engine optimization)",

      // Business Package
      "pricing.business.title": "Business Package",
      "pricing.business.description": "Ideal for growing companies with higher expectations",
      "pricing.business.feature1": "Everything from the Starter Package",
      "pricing.business.feature2": "Up to 7 content pages",
      "pricing.business.feature3": "Contact form & Google Maps integration",
      "pricing.business.feature4": "Newsletter integration",
      "pricing.business.feature4.detail": "(e.g., Mailchimp, Brevo)",
      "pricing.business.feature5": "Custom design concept matching brand identity",
      "pricing.business.feature6": "GDPR-compliant privacy policy",
      "pricing.business.feature7": "Responsive design for all devices",
      "pricing.business.feature8": "Advanced basic SEO optimization",

      // E-Commerce Package
      "pricing.ecomm.title": "Premium Package – E-Commerce & Pro Marketing",
      "pricing.ecomm.description": "Ideal for companies looking to sell online and professionally expand their marketing",
      "pricing.ecomm.feature1": "Everything from the Business Package",
      "pricing.ecomm.feature2": "Online shop with product management",
      "pricing.ecomm.feature2.detail": "(Product catalog, shopping cart, order and customer management)",
      "pricing.ecomm.feature3": "Payment & shipping solutions",
      "pricing.ecomm.feature3.detail": "(Twint, credit card, PayPal, PostFinance, pickup, etc.)",
      "pricing.ecomm.feature4": "Marketing support & campaign tracking",
      "pricing.ecomm.feature4.detail": "(Google Ads, Social Media, newsletter automation)",
      "pricing.ecomm.feature5": "Data protection & cookie banner",
      "pricing.ecomm.feature5.detail": "compliant with GDPR and Swiss data protection law",
      "pricing.ecomm.feature6": "Monthly reporting on website performance",
      "pricing.ecomm.feature7": "Priority support for technical or content adjustments",
      "pricing.ecomm.customizable": "This package is individually customizable.",
      "pricing.ecomm.priceOnRequest": "Price & scope of services on request.",
      "pricing.ecomm.cta": "Request now without obligation",

      // Add-on Services
      "pricing.addons.title": "Add-on Services",
      "pricing.addons.logoDesign": "Logo Design",
      "pricing.addons.copywriting": "Professional Copywriting",
      "pricing.addons.dataProtection": "Data Protection Consulting",
      "pricing.addons.multilingual": "Multilingual Support",
      "pricing.addons.startingFrom": "Starting from:",

      // CTA
      "pricing.cta": "Let's start",
    },
  };

  return translations[lang];
}
