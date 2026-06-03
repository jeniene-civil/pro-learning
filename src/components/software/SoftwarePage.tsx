"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Play, Star, ArrowRight } from "lucide-react";

const softwareList = [
  { name: "ETABS", desc: "Extended Three-Dimensional Analysis of Building Systems", courses: 12, icon: "E" },
  { name: "SAFE", desc: "Slab Analysis by the Finite Element Method", courses: 8, icon: "S" },
  { name: "SAP2000", desc: "Structural Analysis Program", courses: 9, icon: "S2" },
  { name: "Robot", desc: "Robot Structural Analysis Professional", courses: 6, icon: "R" },
  { name: "Revit", desc: "Structure - BIM for Structural Engineering", courses: 7, icon: "R2" },
  { name: "Tekla", desc: "Tekla Structures - BIM Software", courses: 5, icon: "T" },
  { name: "AutoCAD", desc: "Structural Detailing & Drafting", courses: 4, icon: "A" },
  { name: "Primavera", desc: "Project Management & Planning", courses: 3, icon: "P" },
  { name: "AMS Tower", desc: "Tower Analysis & Design", courses: 2, icon: "A2" },
  { name: "Open Tower", desc: "Open Structure Tower Design", courses: 2, icon: "O" },
];

export default function SoftwarePage() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div>
      {/* Hero */}
      <section className="bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-white mb-4">
            Software Training Hub
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Master the industry-standard software used by civil and structural engineers worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-400">
            <span className="px-4 py-2 bg-white/5 rounded-lg">58 Courses</span>
            <span className="px-4 py-2 bg-white/5 rounded-lg">1,200+ Video Lessons</span>
            <span className="px-4 py-2 bg-white/5 rounded-lg">Practice Projects Included</span>
          </div>
        </div>
      </section>

      {/* Software Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {softwareList.map((sw) => (
            <Link
              key={sw.name}
              href={`/${locale}/software/${sw.name.toLowerCase()}`}
              className="group bg-white rounded-2xl border border-border p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center mb-4">
                <span className="text-white font-bold text-lg">{sw.icon}</span>
              </div>
              <h3 className="font-heading font-semibold text-lg text-gray-900 mb-1">{sw.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{sw.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{sw.courses} Courses</span>
                <span className="text-brand text-sm font-medium group-hover:gap-2 transition-all inline-flex items-center gap-1">
                  Explore <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
