"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function PricingPage() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl font-bold text-gray-900 mb-4">
          {t("home.pricingTitle")}
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Choose the perfect plan for your learning journey
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {(["free", "pro", "enterprise"] as const).map((plan) => {
          const isPopular = plan === "pro";
          const includes = t.raw(`pricing.${plan}Includes`) as string[];
          return (
            <div
              key={plan}
              className={`relative bg-white rounded-2xl border ${isPopular ? "border-brand ring-2 ring-brand/20 scale-105" : "border-border"} p-8`}
            >
              {isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold rounded-full">
                  {t("pricing.popular")}
                </span>
              )}
              <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">
                {t(`pricing.${plan}`)}
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                {t(`pricing.${plan}Desc`)}
              </p>
              <div className="mb-6">
                <span className="font-heading text-4xl font-bold text-gray-900">
                  {t(`pricing.${plan}Price`)}
                </span>
                {plan !== "enterprise" && (
                  <span className="text-gray-400 text-sm">{t("pricing.perMonth")}</span>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                {includes.map((item: string) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-0.5 w-4 h-4 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                      <span className="text-emerald-500 text-xs">✓</span>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={plan === "enterprise" ? "/contact" : `/${locale}/register`}
                className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                  isPopular
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:shadow-lg"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-border"
                }`}
              >
                {t(`pricing.${plan === "free" ? "getStarted" : plan === "pro" ? "goPro" : "contactSales"}`)}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
