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
        "Wir entwickeln Plattformen, Next-Gen-Lösungen und Partnerschaften, die Ihr Unternehmen in die digitale Zukunft führen. Ergänzt durch Innovation Labs und Sicherheitslösungen schaffen wir Mehrwert auf allen Ebenen.",
      "hero.cta": "Kostenlose Beratung erhalten",
      "hero.stats.services": "Kernleistungen",
      "hero.stats.lab": "Innovation Lab",
      "hero.stats.quality": "Schweizer Qualität",

      // Services Section
      "services.badge": "Unsere Dienstleistungen",
      "services.title": "Digitale Lösungen für morgen",
      "services.platforms.title": "📡 Plattformen",
      "services.platforms.desc":
        "Massgeschneiderte digitale Plattformen, die Unternehmen, Kunden und Partner verbinden – skalierbar und zukunftssicher.",
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
      "about.team.title": "Spezialistenteam",
      "about.team.desc":
        "Mit einem Team aus Spezialisten für Plattformen, Technologie, Sicherheit und Innovation schaffen wir die Brücke zwischen heute und morgen.",
      "about.implementation.title": "Kreative Umsetzung",
      "about.implementation.desc":
        "Wir verbinden kreatives Denken mit praktischer Umsetzungskraft – für Ergebnisse, die Wirkung zeigen.",

      // Contact Section
      "contact.badge": "Kontakt",
      "contact.title": "Bereit für die nächste Stufe?",
      "contact.subtitle": "Kontaktieren Sie uns für eine persönliche Beratung.",
      "contact.email": "✉️ info@molla.ch",
      "contact.phone": "☎️ +41 71 911 90 00",
      "contact.location": "📍 Schweiz",
      "contact.cta": "Kostenlose Beratung erhalten",

      // Navigation
      "nav.home": "Startseite",
      "nav.about": "Über uns",
      "nav.services": "Dienstleistungen",
      "nav.contact": "Kontakt",
      "nav.contactUs": "Kontaktieren Sie uns",

      // Common
      "common.menu": "Menü",
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

      // Navigation
      "nav.home": "Home",
      "nav.about": "About",
      "nav.services": "Services",
      "nav.contact": "Contact",
      "nav.contactUs": "Contact us",

      // Common
      "common.menu": "Menu",
    },
  };

  return translations[lang];
}
