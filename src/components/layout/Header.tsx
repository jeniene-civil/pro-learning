"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  Menu, X, Globe, GraduationCap,
  User, LogOut, LayoutDashboard,
} from "lucide-react";

const navLinks = [
  { key: "home", href: "/" },
  { key: "courses", href: "/courses" },
  { key: "software", href: "/software" },
  { key: "tools", href: "/tools" },
  { key: "resources", href: "/resources" },
  { key: "blog", href: "/blog" },
  { key: "community", href: "/community" },
  { key: "pricing", href: "/pricing" },
];

export default function Header() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const locale = useLocale();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const otherLocale = locale === "en" ? "fr" : "en";
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const initials = session?.user?.name
    ? session.user.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    : "?";

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

            {session ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-9 h-9 rounded-full bg-brand flex items-center justify-center text-white text-xs font-bold hover:bg-brand-700 transition-colors"
                >
                  {initials}
                </button>
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl border border-border shadow-xl py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">{session.user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                    </div>
                    <Link
                      href={`/${locale}/dashboard`}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      {t("dashboard")}
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: `/${locale}` })}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
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
              </>
            )}
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
            {session ? (
              <>
                <Link
                  href={`/${locale}/dashboard`}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-gray-700"
                  onClick={() => setMenuOpen(false)}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  {t("dashboard")}
                </Link>
                <button
                  onClick={() => { setMenuOpen(false); signOut({ callbackUrl: `/${locale}` }); }}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-red-600 w-full text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
