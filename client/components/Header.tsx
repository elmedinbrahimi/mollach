import { useState } from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeaderProps {
  isDarkBackground?: boolean;
  isOverContact?: boolean;
}

export function Header({
  isDarkBackground = false,
  isOverContact = false,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navigationItems = [
    { label: t("nav.home"), href: "#" },
    { label: t("nav.about"), href: "#" },
    { label: t("nav.services"), href: "#" },
    { label: t("nav.contact"), href: "#" },
  ];

  const textColor = isOverContact
    ? "text-white"
    : isDarkBackground
      ? "text-black"
      : "text-white";
  const hoverColor = "hover:text-primary-500";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className="flex h-16 md:h-20 items-center justify-between px-4 sm:px-8 md:px-16 backdrop-blur-md bg-transparent rounded-lg mx-2 sm:mx-8 md:mx-16 mt-1">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/ea272d15b7c9565581b3fa5a8e203be982913a5e?width=172"
            alt="Molla Logo"
            className="h-12 w-auto md:h-16"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 xl:space-x-12">
          {navigationItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-sm font-grotesk capitalize transition-colors ${textColor} ${hoverColor}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Language Switcher & Contact Button */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Language Switcher */}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={`px-3 py-2 h-10  rounded-full text-sm font-grotesk transition-colors ${
                  isOverContact
                    ? "text-white hover:text-white hover:bg-white/10"
                    : isDarkBackground
                      ? "text-black hover:text-black hover:bg-black/10"
                      : "text-white hover:text-white hover:bg-white/10"
                }`}
              >
                <Globe className="h-4 w-4 mr-2" />
                {language.toUpperCase()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem
                onClick={() => setLanguage("de")}
                className={language === "de" ? "bg-primary-50" : ""}
              >
                🇩🇪 Deutsch
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLanguage("en")}
                className={language === "en" ? "bg-primary-50" : ""}
              >
                🇬🇧 English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Contact Button */}
          <Button
            variant="outline"
            size="sm"
            className={`border-[#472F91] bg-transparent hover:text-white hover:bg-white/10 px-4 py-2 h-10 rounded-full text-sm font-grotesk capitalize transition-colors ${
              isOverContact
                ? "text-white hover:bg-white/10"
                : isDarkBackground
                  ? "text-black hover:bg-black/10"
                  : "text-white hover:bg-white/10"
            }`}
          >
            {t("nav.contactUs")}
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`lg:hidden ${textColor}  ${
                isOverContact
                  ? "text-white hover:bg-white/10 hover:text-white"
                  : isDarkBackground
                    ? "text-black hover:bg-black/10 hover:text-black"
                    : "text-white hover:bg-white/10 hover:text-white"
              }`}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="text-left text-lg font-grotesk">
                {t("common.menu")}
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col space-y-6 mt-8">
              {/* Mobile Language Switcher */}
              <div className="flex gap-2">
                <Button
                  variant={language === "de" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLanguage("de")}
                  className="flex-1"
                >
                  🇩🇪 Deutsch
                </Button>
                <Button
                  variant={language === "en" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLanguage("en")}
                  className="flex-1"
                >
                  🇬🇧 English
                </Button>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-lg font-grotesk capitalize text-gray-700 hover:text-primary-500 transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* Mobile Contact Button */}
              <Button
                variant="outline"
                size="lg"
                className="border-[#472F91] bg-transparent hover:bg-primary-500 hover:text-white text-primary-500 rounded-full text-sm font-grotesk capitalize transition-colors mt-4"
                onClick={() => setIsOpen(false)}
              >
                {t("nav.contactUs")}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
