import { useState } from "react";
import { Link } from "react-router-dom";
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
    { label: t("nav.home"), href: "/" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.services"), href: "/services" },
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
            <Link
              key={item.label}
              to={item.href}
              className={`text-sm font-grotesk capitalize transition-colors ${textColor} ${hoverColor}`}
            >
              {item.label}
            </Link>
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
            <DropdownMenuContent
              align="end"
              className="w-32 bg-gradient-to-br from-[#0D0D5D] via-[#000037] to-[#93278F] border border-[#472F91] shadow-xl rounded-lg backdrop-blur-sm"
              style={{
                background:
                  "linear-gradient(135deg, rgba(13, 13, 93, 0.95) 0%, rgba(0, 0, 55, 0.95) 50%, rgba(147, 39, 143, 0.95) 100%)",
              }}
            >
              <DropdownMenuItem
                onClick={() => setLanguage("de")}
                className={`cursor-pointer transition-all duration-200 rounded-md mx-1 my-1 ${
                  language === "de"
                    ? "bg-gradient-to-r from-[#472F91] to-[#8F278F] text-white"
                    : "text-white hover:bg-white/10"
                }`}
              >
                🇩🇪 Deutsch
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLanguage("en")}
                className={`cursor-pointer transition-all duration-200 rounded-md mx-1 my-1 ${
                  language === "en"
                    ? "bg-gradient-to-r from-[#472F91] to-[#8F278F] text-white"
                    : "text-white hover:bg-white/10"
                }`}
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
          <SheetContent
            side="right"
            className="w-full bg-gradient-to-br from-[#0D0D5D] via-[#000037] to-[#370335] border-[#472F91]"
          >
            <div className="flex items-center justify-between">
              <SheetHeader className="flex items-center mb-4">
                <SheetTitle className="text-left text-lg font-grotesk text-white">
                  {t("common.menu")}
                </SheetTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto text-white hover:bg-white/10 hover:text-white"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </Button>
              </SheetHeader>
            </div>

            <div className="flex flex-col space-y-6 mt-8">
              {/* Mobile Language Switcher */}
              <div className="flex gap-2">
                <Button
                  variant={language === "de" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLanguage("de")}
                  className={`flex-1 rounded-full font-grotesk transition-all duration-200 ${
                    language === "de"
                      ? "bg-gradient-to-r from-[#472F91] to-[#8F278F] text-white border-none hover:scale-105"
                      : "border-[#472F91] bg-transparent text-white hover:bg-white/10 hover:text-white"
                  }`}
                >
                  🇩🇪 Deutsch
                </Button>
                <Button
                  variant={language === "en" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLanguage("en")}
                  className={`flex-1 rounded-full font-grotesk transition-all duration-200 ${
                    language === "en"
                      ? "bg-gradient-to-r from-[#472F91] to-[#8F278F] text-white border-none hover:scale-105"
                      : "border-[#472F91] bg-transparent text-white hover:bg-white/10 hover:text-white"
                  }`}
                >
                  🇬🇧 English
                </Button>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="text-lg font-grotesk capitalize text-white/80 hover:text-white transition-all duration-200 py-3 px-4 rounded-lg hover:bg-white/10 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile Contact Button */}
              <Button
                variant="outline"
                size="lg"
                className="bg-gradient-to-r from-[#472F91] to-[#8F278F] text-white border-none hover:scale-105 rounded-full text-sm font-grotesk capitalize transition-all duration-200 mt-4 shadow-lg"
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
