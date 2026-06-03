"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import {
  BookOpen,
  Clock,
  Award,
  Download,
  Play,
  Star,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

export default function DashboardPage() {
  const t = useTranslations();
  const locale = useLocale();

  const enrolledCourses = [
    { title: "ETABS Complete Mastery Course", progress: 68, instructor: "Dr. Ahmed Hassan", lastLesson: "Lesson 5.2", duration: "24h 30m" },
    { title: "RC Design ACI 318-19", progress: 92, instructor: "Dr. Martinez", lastLesson: "Lesson 8.5", duration: "18h 45m" },
    { title: "Seismic Design ASCE 7", progress: 31, instructor: "Prof. Chen", lastLesson: "Lesson 2.4", duration: "20h 00m" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-brand-900 to-brand rounded-2xl p-6 sm:p-8 mb-8">
        <h1 className="font-heading text-2xl font-bold text-white mb-2">
          Good morning, Engineer! 👋
        </h1>
        <p className="text-brand-100 text-sm">
          You have 3 lessons remaining in ETABS Complete Mastery.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: BookOpen, value: "7", label: t("courses.allCourses"), color: "text-blue-600 bg-blue-50" },
          { icon: Clock, value: "48.5h", label: "Watched Total", color: "text-emerald-600 bg-emerald-50" },
          { icon: Award, value: "3", label: "Certificates Earned", color: "text-amber-600 bg-amber-50" },
          { icon: Download, value: "28", label: "Downloads Used", color: "text-purple-600 bg-purple-50" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-border p-4">
            <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div className="font-heading text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Continue Learning */}
      <div className="bg-white rounded-2xl border border-border p-6 mb-8">
        <h2 className="font-heading text-lg font-semibold text-gray-900 mb-4">Continue Learning</h2>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shrink-0">
            <Play className="w-8 h-8 text-gray-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 truncate">ETABS Complete Mastery Course</h3>
            <p className="text-sm text-gray-500 mb-2">Section 5: RC Beam Design</p>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
              <div className="bg-brand rounded-full h-2" style={{ width: "68%" }} />
            </div>
            <p className="text-xs text-gray-400">Next: 5.3 Beam Design (22 min)</p>
          </div>
          <Link
            href={`/${locale}/courses/etabs-complete-mastery/lesson-5-3`}
            className="shrink-0 px-5 py-2.5 bg-brand text-white text-sm font-semibold rounded-lg hover:bg-brand-700 transition-colors"
          >
            <Play className="w-4 h-4 inline mr-1" />
            Continue
          </Link>
        </div>
      </div>

      {/* My Courses */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-lg font-semibold text-gray-900">My Courses</h2>
          <Link href={`/${locale}/courses`} className="text-sm text-brand font-medium">
            View All Courses →
          </Link>
        </div>
        <div className="space-y-4">
          {enrolledCourses.map((course) => (
            <div key={course.title} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shrink-0">
                <Play className="w-6 h-6 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 text-sm truncate">{course.title}</h3>
                <p className="text-xs text-gray-500">{course.instructor} · {course.duration}</p>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                  <div
                    className="bg-brand rounded-full h-1.5"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{course.progress}% complete</p>
              </div>
              <span className="text-xs text-gray-400">{course.lastLesson}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
