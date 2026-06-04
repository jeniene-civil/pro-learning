"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Search, SlidersHorizontal, Star, Play } from "lucide-react";
import { useState, useEffect } from "react";

export default function CoursesPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/courses")
      .then((r) => r.json())
      .then((data) => setCourses(data))
      .finally(() => setLoading(false));
  }, []);

  const categories = ["structural", "geotechnical", "transportation", "construction", "bim", "research"];

  const filtered = courses.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = !selectedCat || c.category?.slug === selectedCat;
    return matchSearch && matchCat;
  });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="animate-spin w-8 h-8 border-2 border-brand border-t-transparent rounded-full mx-auto" />
        <p className="text-gray-500 mt-3 text-sm">Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          {t("courses.allCourses")}
        </h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t("courses.searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-gray-400" />
            <select className="px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20">
              <option>{t("courses.sortPopular")}</option>
              <option>{t("courses.sortNewest")}</option>
              <option>{t("courses.sortRating")}</option>
            </select>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-3">
          Showing {filtered.length} courses
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:w-64 shrink-0">
          <div className="bg-white rounded-2xl border border-border p-6 sticky top-24">
            <h3 className="font-heading font-semibold text-gray-900 mb-4">
              {t("courses.filters")}
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">{t("courses.filters")}</h4>
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 py-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCat === cat}
                      onChange={() => setSelectedCat(selectedCat === cat ? null : cat)}
                      className="w-4 h-4 rounded border-gray-300 text-brand focus:ring-brand"
                    />
                    <span className="text-sm text-gray-600">{t(`categories.${cat}`)}</span>
                  </label>
                ))}
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">{t("courses.level")}</h4>
                {["beginner", "intermediate", "advanced"].map((lvl) => (
                  <label key={lvl} className="flex items-center gap-2 py-1.5 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-brand focus:ring-brand" />
                    <span className="text-sm text-gray-600 capitalize">{t(`courses.${lvl}`)}</span>
                  </label>
                ))}
              </div>
            </div>
            <button className="w-full mt-6 py-2.5 bg-brand text-white text-sm font-semibold rounded-lg hover:bg-brand-700 transition-colors">
              {t("courses.apply")}
            </button>
          </div>
        </aside>

        {/* Course Grid */}
        <div className="flex-1">
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
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
                    <span className="text-xs text-gray-400">({course.studentsCount})</span>
                    {course.price > 0 ? (
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
                  <p className="text-xs text-gray-500 mb-3">{course.instructor?.name}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                    <span>{course.duration}</span>
                    <span className="capitalize">{t(`courses.${course.level?.toLowerCase()}`)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/${locale}/courses/${course.slug}`}
                      className="flex-1 text-center py-2.5 text-sm font-semibold text-white bg-brand rounded-lg hover:bg-brand-700 transition-colors"
                    >
                      {course.price > 0 ? t("courses.enrollNow") : t("courses.enrollFree")}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
