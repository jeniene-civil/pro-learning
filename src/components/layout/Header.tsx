"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Globe,
  GraduationCap,
} from "lucide-react";

const navLinks = [
  { key: "home", href: "/" },
  { key: "courses", href: "/courses" },
  { key: "software", href: "/software" },
  { key: "tools", href: "/tools" },
  { key: "resources", href: "/resources" },
  { key: "community", href: "/community" },
  { key: "pricing", href: "/pricing" },
];

export default function Header() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const locale = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const otherLocale = locale === "en" ? "fr" : "en";

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${locale}`} className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 bg-brand rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-xl text-brand">
              Pro Learning
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={`/${locale}${link.href}`}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-brand rounded-lg hover:bg-brand-50 transition-colors"
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href={`/${otherLocale}`}
              className="flex items-center gap-1 px-3 py-2 text-sm text-gray-500 hover:text-brand rounded-lg hover:bg-brand-50 transition-colors"
            >
              <Globe className="w-4 h-4" />
              {tc(otherLocale)}
            </Link>
            <Link
              href={`/${locale}/login`}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-brand transition-colors"
            >
              {t("login")}
            </Link>
            <Link
              href={`/${locale}/register`}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-brand rounded-lg hover:bg-brand-700 shadow-blue transition-all duration-200"
            >
              {t("startFree")}
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-border bg-white">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={`/${locale}${link.href}`}
                className="block px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-brand rounded-lg hover:bg-brand-50"
                onClick={() => setMenuOpen(false)}
              >
                {t(link.key)}
              </Link>
            ))}
            <hr className="my-2" />
            <Link
              href={`/${otherLocale}`}
              className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-500"
              onClick={() => setMenuOpen(false)}
            >
              <Globe className="w-4 h-4" />
              {locale === "en" ? "Français" : "English"}
            </Link>
            <Link
              href={`/${locale}/login`}
              className="block px-3 py-2.5 text-sm font-medium text-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              {t("login")}
            </Link>
            <Link
              href={`/${locale}/register`}
              className="block px-5 py-2.5 text-sm font-semibold text-center text-white bg-brand rounded-lg"
              onClick={() => setMenuOpen(false)}
            >
              {t("startFree")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
