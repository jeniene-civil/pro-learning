"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, BookOpen, Users, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const locale = useLocale();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push(`/${locale}/login`);
    if (status === "authenticated" && (session.user as any).role !== "ADMIN") router.push(`/${locale}/dashboard`);
  }, [status, router, locale, session]);

  useEffect(() => {
    fetch("/api/courses").then(r => r.json()).then(setCourses).finally(() => setLoading(false));
  }, []);

  if (status === "loading" || loading) {
    return <div className="max-w-7xl mx-auto px-4 py-20 text-center"><div className="animate-spin w-8 h-8 border-2 border-brand border-t-transparent rounded-full mx-auto" /><p className="text-gray-500 mt-3 text-sm">Loading...</p></div>;
  }

  if ((session?.user as any)?.role !== "ADMIN") return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm">Manage your courses and content</p>
        </div>
        <Link href={`/${locale}/admin/courses/new`} className="flex items-center gap-2 px-4 py-2.5 bg-brand text-white text-sm font-semibold rounded-lg hover:bg-brand-700 transition-colors">
          <Plus className="w-4 h-4" />
          New Course
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { icon: BookOpen, value: courses.length.toString(), label: "Total Courses", color: "text-blue-600 bg-blue-50" },
          { icon: Users, value: courses.reduce((s: number, c: any) => s + c.studentsCount, 0).toLocaleString(), label: "Total Students", color: "text-emerald-600 bg-emerald-50" },
          { icon: Eye, value: courses.filter((c: any) => c.published).length.toString(), label: "Published", color: "text-amber-600 bg-amber-50" },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-xl border border-border p-4">
            <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}><stat.icon className="w-5 h-5" /></div>
            <div className="font-heading text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="font-heading font-semibold text-gray-900">Courses</h2>
          <span className="text-xs text-gray-400">{courses.length} courses</span>
        </div>
        {courses.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="font-medium">No courses yet</p>
            <p className="text-sm mt-1">Create your first course to get started</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {courses.map((course: any) => (
              <div key={course.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shrink-0">
                  <BookOpen className="w-6 h-6 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900 text-sm truncate">{course.title}</h3>
                    {course.published ? <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-xs rounded-full">Live</span> : <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">Draft</span>}
                  </div>
                  <p className="text-xs text-gray-500">{course.category?.name} · {course.lessonsCount} lessons · {(course.studentsCount || 0).toLocaleString()} students</p>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-2 text-gray-400 hover:text-brand rounded-lg hover:bg-gray-100"><Edit className="w-4 h-4" /></button>
                  <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
