"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { GraduationCap } from "lucide-react";

const footerSections = [
  {
    title: "courses",
    links: [
      { key: "structural", href: "/courses/structural" },
      { key: "geotechnical", href: "/courses/geotechnical" },
      { key: "transportation", href: "/courses/transportation" },
      { key: "construction", href: "/courses/construction" },
      { key: "bim", href: "/courses/bim" },
    ],
  },
  {
    title: "resources",
    links: [
      { key: "Software", href: "/software" },
      { key: "Tools", href: "/tools" },
      { key: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "company",
    links: [
      { key: "About", href: "/about" },
      { key: "Blog", href: "/blog" },
      { key: "Careers", href: "/careers" },
      { key: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  const t = useTranslations("footer");
  const tc = useTranslations("categories");
  const locale = useLocale();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-brand rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl text-white">
                Pro Learning
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              {t("description")}
            </p>
            <div className="flex gap-3">
              {["LinkedIn", "YouTube", "Facebook", "Twitter"].map((s) => (
                <span
                  key={s}
                  className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center text-xs text-gray-400 hover:bg-brand hover:text-white cursor-pointer transition-colors"
                >
                  {s[0]}
                </span>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-heading font-semibold text-white text-sm mb-4 uppercase tracking-wider">
                {t(section.title)}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={`/${locale}${link.href}`}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {tc(link.key.toLowerCase()) || link.key}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Pro Learning. {t("allRights")}
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">
              {t("privacy")}
            </Link>
            <Link href={`/${locale}/terms`} className="hover:text-white transition-colors">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
