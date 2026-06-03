"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useState } from "react";
import { Search, BookOpen, FileText, GraduationCap, Download, FileCode2, Newspaper } from "lucide-react";

const categories = [
  { key: "all", label: "All Resources", icon: null },
  { key: "books", label: "Engineering Books", icon: BookOpen, count: 120 },
  { key: "codes", label: "Design Codes", icon: FileCode2, count: 45 },
  { key: "lectures", label: "Lecture Notes", icon: GraduationCap, count: 85 },
  { key: "papers", label: "Research Papers", icon: Newspaper, count: 62 },
  { key: "guides", label: "Study Guides", icon: FileText, count: 38 },
  { key: "reports", label: "Project Reports", icon: Download, count: 28 },
];

const resources = [
  { title: "Design of Reinforced Concrete - Jack C. McCormac", cat: "books", type: "📘", downloads: "12,400" },
  { title: "ACI 318-19 Building Code Requirements", cat: "codes", type: "📋", downloads: "9,800" },
  { title: "Steel Structure Design Notes - MIT OCW", cat: "lectures", type: "📝", downloads: "6,200" },
  { title: "Seismic Performance of RC Frames (2024)", cat: "papers", type: "📄", downloads: "4,100" },
  { title: "PE Structural Exam Study Guide", cat: "guides", type: "📖", downloads: "7,500" },
  { title: "ETABS High-Rise Building Report", cat: "reports", type: "📊", downloads: "3,800" },
  { title: "Foundation Engineering - Braja M. Das", cat: "books", type: "📘", downloads: "8,900" },
  { title: "Eurocode 2: Design of Concrete Structures", cat: "codes", type: "📋", downloads: "5,600" },
  { title: "Advanced Steel Design Lecture Series", cat: "lectures", type: "📝", downloads: "4,300" },
];

export default function ResourcesPage() {
  const locale = useLocale();
  const [activeCat, setActiveCat] = useState("all");
  const filtered = activeCat === "all" ? resources : resources.filter(r => r.cat === activeCat);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="text-center mb-10">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Resource Library</h1>
        <p className="text-gray-500">Engineering books, design codes, lecture notes & research papers</p>
        <div className="relative max-w-xl mx-auto mt-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search resources..." className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand text-sm" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map(cat => (
          <button key={cat.key} onClick={() => setActiveCat(cat.key)} className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeCat === cat.key ? "bg-brand text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            {cat.icon && <cat.icon className="w-4 h-4" />}
            {cat.label}
            {cat.count && <span className="text-xs opacity-70">({cat.count})</span>}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(res => (
          <div key={res.title} className="bg-white rounded-xl border border-border p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
            <div className="text-2xl mb-3">{res.type}</div>
            <h3 className="font-heading font-semibold text-gray-900 text-sm mb-2 line-clamp-2">{res.title}</h3>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-400">📥 {res.downloads} downloads</span>
              <button className="px-4 py-1.5 bg-brand text-white text-xs font-semibold rounded-lg hover:bg-brand-700 transition-colors">Download</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
