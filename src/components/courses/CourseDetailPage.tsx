"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Play, Star, ChevronDown, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function CourseDetailPage({ slug }: { slug: string }) {
  const t = useTranslations();
  const locale = useLocale();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/courses/slug/${slug}`)
      .then((r) => r.json())
      .then((data) => setCourse(data))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="animate-spin w-8 h-8 border-2 border-brand border-t-transparent rounded-full mx-auto" />
        <p className="text-gray-500 mt-3 text-sm">Loading course...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
        <Link href={`/${locale}/courses`} className="text-brand hover:underline">← Back to Courses</Link>
      </div>
    );
  }

  const sections = course.lessons?.reduce((acc: any[], lesson: any) => {
    const existing = acc.find((s) => s.title === lesson.sectionTitle);
    if (existing) {
      existing.lessons.push(lesson);
    } else {
      acc.push({ title: lesson.sectionTitle, lessons: [lesson] });
    }
    return acc;
  }, []) || [];

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
                {course.title}
              </h1>
              <p className="text-gray-300 text-lg mb-6">{course.shortDescription}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-semibold text-white">{course.rating}</span>
                  <span>({course.studentsCount} students)</span>
                </div>
                <span>{course.studentsCount.toLocaleString()} enrolled</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <span>Created by <span className="text-white font-medium">{course.instructor?.name}</span></span>
                <span>🌐 {course.language}</span>
                <span>Updated {new Date(course.updatedAt).toLocaleDateString()}</span>
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
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> {course.duration} on-demand video</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> {course.lessonsCount} lessons</li>
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
          <p className="text-sm text-gray-500 mb-6">{course.lessonsCount} lessons · {course.duration} total · {sections.length} sections</p>
          <div className="space-y-2">
            {sections.map((section: any, idx: number) => (
              <details key={section.title} className="bg-white rounded-xl border border-border overflow-hidden group" open={idx === 0}>
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
                    <span className="font-medium text-gray-900 text-sm">{section.title}</span>
                  </div>
                  <span className="text-xs text-gray-500">{section.lessons.length} lessons</span>
                </summary>
                <div className="px-5 pb-4 space-y-2">
                  {section.lessons.map((lesson: any, i: number) => (
                    <div key={lesson.id} className="flex items-center justify-between py-1.5 pl-7">
                      <div className="flex items-center gap-2 text-sm">
                        <Play className={`w-3.5 h-3.5 ${lesson.free ? "text-emerald-500" : "text-gray-300"}`} />
                        <span className={lesson.free ? "text-gray-900" : "text-gray-500"}>
                          {lesson.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400">{lesson.duration}</span>
                        {lesson.free && <span className="text-xs text-emerald-600 font-medium">FREE</span>}
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
