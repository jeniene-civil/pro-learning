"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import {
  Play,
  ArrowRight,
  Star,
  ChevronRight,
  GraduationCap,
  Building2,
  Globe2,
  Route,
  HardHat,
  Monitor,
  FlaskConical,
  BookOpen,
  Download,
  Award,
  Users,
} from "lucide-react";

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();

  const categories = [
    { key: "structural", icon: Building2, count: 45, color: "from-blue-500 to-blue-600" },
    { key: "geotechnical", icon: Globe2, count: 28, color: "from-emerald-500 to-emerald-600" },
    { key: "transportation", icon: Route, count: 22, color: "from-amber-500 to-amber-600" },
    { key: "construction", icon: HardHat, count: 35, color: "from-orange-500 to-orange-600" },
    { key: "bim", icon: Monitor, count: 30, color: "from-purple-500 to-purple-600" },
    { key: "research", icon: FlaskConical, count: 18, color: "from-rose-500 to-rose-600" },
  ];

  const features = [
    { key: "instructors", icon: GraduationCap },
    { key: "practical", icon: Building2 },
    { key: "downloads", icon: Download },
    { key: "software", icon: Monitor },
    { key: "certificates", icon: Award },
    { key: "community", icon: Users },
  ];

  const courses = [
    {
      thumb: null,
      title: "ETABS Complete Mastery Course",
      rating: 4.9,
      reviews: 892,
      students: "12,450",
      instructor: "Dr. Ahmed Hassan, PE",
      duration: "24h 30m",
      level: "advanced",
      isPro: true,
    },
    {
      thumb: null,
      title: "RC Design ACI 318-19",
      rating: 4.9,
      reviews: 743,
      students: "9,800",
      instructor: "Dr. Martinez",
      duration: "18h 45m",
      level: "intermediate",
      isPro: false,
    },
    {
      thumb: null,
      title: "Seismic Design ASCE 7",
      rating: 4.7,
      reviews: 512,
      students: "6,200",
      instructor: "Prof. Chen",
      duration: "20h 00m",
      level: "advanced",
      isPro: true,
    },
    {
      thumb: null,
      title: "Soil Mechanics Fundamentals",
      rating: 4.7,
      reviews: 543,
      students: "8,320",
      instructor: "Prof. Smith",
      duration: "16h 00m",
      level: "beginner",
      isPro: false,
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-dark-bg via-dark-surface to-dark-card overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/20 text-brand-300 text-sm font-medium rounded-full mb-6">
              <GraduationCap className="w-4 h-4" />
              #1 Civil Engineering Learning Platform
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${locale}/register`}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand text-white font-semibold rounded-xl hover:bg-brand-700 shadow-blue transition-all duration-200"
              >
                <Play className="w-5 h-5" />
                {t("hero.ctaStart")}
              </Link>
              <Link
                href={`/${locale}/courses`}
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-gray-500 text-gray-200 font-medium rounded-xl hover:bg-white/10 transition-all duration-200"
              >
                {t("hero.ctaExplore")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            {[
              { icon: BookOpen, value: "200+", label: t("hero.statsCourses") },
              { icon: Users, value: "50,000+", label: t("hero.statsStudents") },
              { icon: Download, value: "100,000+", label: t("hero.statsDownloads") },
              { icon: Award, value: "500+", label: t("hero.statsResources") },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-brand-300" />
                <div className="font-heading text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t("home.categoriesTitle")}
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Comprehensive civil engineering curriculum covering all major disciplines
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.key}
                href={`/${locale}/courses/${cat.key}`}
                className="group relative overflow-hidden bg-white rounded-2xl border border-border p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4`}>
                  <cat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-gray-900 mb-1">
                  {t(`categories.${cat.key}`)}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{cat.count} courses</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-brand group-hover:gap-2 transition-all">
                  Explore <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t("home.whyTitle")}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat) => (
              <div
                key={feat.key}
                className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-11 h-11 bg-brand-50 rounded-xl flex items-center justify-center mb-4">
                  <feat.icon className="w-5.5 h-5.5 text-brand" />
                </div>
                <h3 className="font-heading font-semibold text-gray-900 mb-2">
                  {t(`features.${feat.key}`)}
                </h3>
                <p className="text-sm text-gray-500">
                  {t(`features.${feat.key}Desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900">
              {t("home.popularTitle")}
            </h2>
            <Link
              href={`/${locale}/courses`}
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-brand hover:gap-2 transition-all"
            >
              {t("home.viewAll")}
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <div
                key={course.title}
                className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <Play className="w-10 h-10 text-gray-400" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-semibold text-gray-900">{course.rating}</span>
                    </div>
                    <span className="text-xs text-gray-400">({course.reviews})</span>
                    {course.isPro ? (
                      <span className="ml-auto px-2 py-0.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-semibold rounded-full">
                        PRO
                      </span>
                    ) : (
                      <span className="ml-auto px-2 py-0.5 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-full">
                        FREE
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading font-semibold text-gray-900 mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3">{course.instructor}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                    <span>{course.duration}</span>
                    <span className="capitalize">{course.level}</span>
                  </div>
                  <button className="w-full py-2.5 text-sm font-semibold text-white bg-brand rounded-lg hover:bg-brand-700 transition-colors">
                    {course.isPro ? t("courses.proAccess") : t("courses.enrollFree")}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href={`/${locale}/courses`}
              className="inline-flex items-center gap-1 text-sm font-medium text-brand"
            >
              {t("home.viewAll")}
            </Link>
          </div>
        </div>
      </section>

      {/* Software Hub */}
      <section className="py-16 lg:py-24 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
              {t("home.softwareHub")}
            </h2>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-4">
            {[
              "ETABS", "SAFE", "SAP2000", "Robot", "Revit",
              "Tekla", "AutoCAD", "Primavera", "AMS Tower", "Open Tower",
            ].map((sw) => (
              <div
                key={sw}
                className="aspect-square bg-white/5 border border-white/10 rounded-xl flex flex-col items-center justify-center hover:bg-white/10 hover:border-brand/50 transition-all cursor-pointer"
              >
                <span className="text-xs font-bold text-white text-center leading-tight">{sw}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 lg:py-24" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t("home.pricingTitle")}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {(["free", "pro", "enterprise"] as const).map((plan) => {
              const isPopular = plan === "pro";
              const includes = t.raw(`pricing.${plan}Includes`) as string[];
              return (
                <div
                  key={plan}
                  className={`relative bg-white rounded-2xl border ${isPopular ? "border-brand ring-2 ring-brand/20" : "border-border"} p-8 ${isPopular ? "scale-105" : ""}`}
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
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-brand-900 to-brand">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Advance Your Engineering Career?
          </h2>
          <p className="text-brand-100 mb-8 max-w-xl mx-auto">
            Join 50,000+ engineers already learning on Pro Learning
          </p>
          <Link
            href={`/${locale}/register`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand font-bold rounded-xl hover:bg-gray-100 shadow-lg transition-all"
          >
            Get Started Free Today
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
