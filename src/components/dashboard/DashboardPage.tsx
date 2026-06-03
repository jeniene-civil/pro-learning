"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  BookOpen, Clock, Award, Download,
  Play, ChevronRight, LogOut, User,
  Mail, Calendar,
} from "lucide-react";

export default function DashboardPage() {
  const t = useTranslations();
  const locale = useLocale();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/${locale}/login`);
    }
  }, [status, router, locale]);

  if (status === "loading") {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="animate-spin w-8 h-8 border-2 border-brand border-t-transparent rounded-full mx-auto" />
        <p className="text-gray-500 mt-3 text-sm">Loading your dashboard...</p>
      </div>
    );
  }

  if (!session?.user) return null;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const name = session.user.name || "Engineer";
  const email = session.user.email || "";
  const initials = name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2);

  const enrolledCourses = [
    { title: "ETABS Complete Mastery Course", progress: 68, instructor: "Dr. Ahmed Hassan", lastLesson: "Lesson 5.2", duration: "24h 30m" },
    { title: "RC Design ACI 318-19", progress: 92, instructor: "Dr. Martinez", lastLesson: "Lesson 8.5", duration: "18h 45m" },
    { title: "Seismic Design ASCE 7", progress: 31, instructor: "Prof. Chen", lastLesson: "Lesson 2.4", duration: "20h 00m" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-brand-900 to-brand rounded-2xl p-6 sm:p-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-white mb-1">
              {greeting}, {name}! 👋
            </h1>
            <p className="text-brand-100 text-sm">
              You have 3 lessons remaining in ETABS Complete Mastery.
            </p>
          </div>
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white text-lg font-bold shrink-0">
            {initials}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: BookOpen, value: "7", label: "Active Courses", color: "text-blue-600 bg-blue-50" },
          { icon: Clock, value: "48.5h", label: "Watched Total", color: "text-emerald-600 bg-emerald-50" },
          { icon: Award, value: "3", label: "Certificates", color: "text-amber-600 bg-amber-50" },
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

      {/* Profile + Continue Learning row */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-border p-6">
          <h2 className="font-heading text-lg font-semibold text-gray-900 mb-4">Profile</h2>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-white font-bold">{initials}</div>
            <div>
              <p className="font-medium text-gray-900">{session.user.name}</p>
              <p className="text-sm text-gray-500">{session.user.email}</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <User className="w-4 h-4" />
              <span>Role: <span className="text-gray-900 font-medium">Student</span></span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>Member since: 2025</span>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: `/${locale}` })}
            className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* Continue Learning */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border p-6">
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
              href={`/${locale}/courses/etabs-complete-mastery/learn`}
              className="shrink-0 px-5 py-2.5 bg-brand text-white text-sm font-semibold rounded-lg hover:bg-brand-700 transition-colors"
            >
              <Play className="w-4 h-4 inline mr-1" />
              Continue
            </Link>
          </div>
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
                  <div className="bg-brand rounded-full h-1.5" style={{ width: `${course.progress}%` }} />
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
