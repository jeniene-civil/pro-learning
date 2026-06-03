"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Play, Star, ChevronDown, Clock, Download, Award, CheckCircle } from "lucide-react";

const courseData = {
  title: "ETABS Complete Mastery Course",
  subtitle: "From Zero to Professional ETABS Engineer - Analysis, Design, Code Compliance",
  rating: 4.9,
  reviews: 892,
  students: "12,450",
  instructor: "Dr. Ahmed Hassan, PE",
  duration: "24h 30m",
  lessons: 186,
  level: "advanced",
  updated: "03/2025",
  language: "English",
  isPro: true,
  sections: [
    { title: "Introduction to ETABS Interface", lessons: 3, free: 2 },
    { title: "Structural Modeling Basics", lessons: 12, free: 0 },
    { title: "Load Definition & Assignment", lessons: 10, free: 0 },
    { title: "Analysis & Results Interpretation", lessons: 15, free: 0 },
    { title: "RC Design - ACI 318", lessons: 18, free: 0 },
    { title: "Steel Design - AISC 360", lessons: 14, free: 0 },
    { title: "Seismic Analysis - ASCE 7", lessons: 16, free: 0 },
    { title: "High-Rise Building Design", lessons: 20, free: 0 },
    { title: "Foundation Design Integration", lessons: 12, free: 0 },
  ],
};

export default function CourseDetailPage() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div>
      {/* Header */}
      <div className="bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                <Link href={`/${locale}`} className="hover:text-white">Home</Link>
                <span>/</span>
                <Link href={`/${locale}/courses`} className="hover:text-white">Courses</Link>
                <span>/</span>
                <span className="text-gray-300">Structural</span>
              </div>
              <h1 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-3">
                {courseData.title}
              </h1>
              <p className="text-gray-300 text-lg mb-6">{courseData.subtitle}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-semibold text-white">{courseData.rating}</span>
                  <span>({courseData.reviews} reviews)</span>
                </div>
                <span>{courseData.students} students</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <span>Created by <span className="text-white font-medium">{courseData.instructor}</span></span>
                <span>🌐 {courseData.language}</span>
                <span>Updated {courseData.updated}</span>
              </div>
            </div>

            {/* Enrollment Card */}
            <div className="lg:w-96 shrink-0">
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
                <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center cursor-pointer group">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 text-brand ml-0.5" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-bold rounded-full">
                      PRO ACCESS
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">$29<span className="text-sm font-normal text-gray-400">/month</span></p>
                  <p className="text-sm text-gray-500 mb-6">or $199/year (save $149)</p>
                  <Link
                    href={`/${locale}/register`}
                    className="block text-center py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors mb-3"
                  >
                    Start Learning
                  </Link>
                  <button className="w-full py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors">
                    Add to Wishlist
                  </button>
                  <hr className="my-4" />
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> {courseData.duration} on-demand video</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> {courseData.lessons} lessons</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Certificate of completion</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Lifetime access</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> 15 downloadable resources</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">Curriculum</h2>
          <p className="text-sm text-gray-500 mb-6">{courseData.lessons} lessons · {courseData.duration} total · {courseData.sections.length} sections</p>
          <div className="space-y-2">
            {courseData.sections.map((section, idx) => (
              <details key={section.title} className="bg-white rounded-xl border border-border overflow-hidden group" open={idx === 0}>
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
                    <span className="font-medium text-gray-900 text-sm">{section.title}</span>
                  </div>
                  <span className="text-xs text-gray-500">{section.lessons} lessons</span>
                </summary>
                <div className="px-5 pb-4 space-y-2">
                  {Array.from({ length: section.lessons }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5 pl-7">
                      <div className="flex items-center gap-2 text-sm">
                        <Play className={`w-3.5 h-3.5 ${i < section.free ? "text-emerald-500" : "text-gray-300"}`} />
                        <span className={i < section.free ? "text-gray-900" : "text-gray-500"}>
                          Lesson {idx + 1}.{i + 1}: {["Introduction", "Setup", "Modeling", "Analysis", "Design", "Review"][i % 6]}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400">{10 + i * 3}:00</span>
                        {i < section.free && <span className="text-xs text-emerald-600 font-medium">FREE</span>}
                        {i >= section.free && idx > 0 && <Lock className="w-3 h-3 text-gray-300" />}
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Lock({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  );
}
