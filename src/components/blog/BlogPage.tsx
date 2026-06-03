"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import { Search, Calendar, User, ArrowRight, Clock } from "lucide-react";

const posts = [
  { slug: "etabs-2025-tutorial", title: "ETABS 2025: New Features & Tutorial for Structural Engineers", excerpt: "Explore the latest features in ETABS 2025 including improved BIM integration, enhanced seismic analysis, and a revamped UI.", author: "Dr. Ahmed Hassan", date: "Mar 15, 2025", readTime: "8 min", category: "Software", image: null },
  { slug: "aci-318-19-vs-eurocode-2", title: "ACI 318-19 vs Eurocode 2: Key Differences in RC Design", excerpt: "A comprehensive comparison of concrete design approaches between American and European standards.", author: "Prof. Maria Martinez", date: "Mar 10, 2025", readTime: "12 min", category: "Design Codes", image: null },
  { slug: "seismic-design-highrise", title: "Seismic Design of High-Rise Buildings: A Practical Guide", excerpt: "Learn the fundamental principles of seismic design for tall structures including response spectrum analysis.", author: "Prof. James Chen", date: "Mar 5, 2025", readTime: "15 min", category: "Structural", image: null },
  { slug: "revit-structure-bim-workflow", title: "Revit Structure: Complete BIM Workflow for Engineers", excerpt: "From modeling to documentation - master the BIM workflow using Revit Structure for your projects.", author: "Arch. Sofia Garcia", date: "Feb 28, 2025", readTime: "10 min", category: "BIM", image: null },
  { slug: "foundation-design-essentials", title: "Foundation Design Essentials: Shallow vs Deep Foundations", excerpt: "Understanding when to use shallow or deep foundations based on soil conditions and structural loads.", author: "Dr. Robert Williams", date: "Feb 20, 2025", readTime: "11 min", category: "Geotechnical", image: null },
  { slug: "passing-pe-exam", title: "How to Pass the PE Civil Exam: Study Guide & Tips", excerpt: "A proven study strategy from engineers who passed the PE exam on their first attempt.", author: "Eng. Raj Patel", date: "Feb 15, 2025", readTime: "7 min", category: "Career", image: null },
];

const categories = ["All", "Software", "Structural", "Design Codes", "BIM", "Geotechnical", "Career"];

export default function BlogPage() {
  const locale = useLocale();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="text-center mb-10">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Engineering Blog</h1>
        <p className="text-gray-500">Tutorials, guides, and insights from industry professionals</p>
        <div className="relative max-w-xl mx-auto mt-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search articles..." className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand text-sm" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map(cat => (
          <button key={cat} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${cat === "All" ? "bg-brand text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{cat}</button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <Link key={post.slug} href={`/${locale}/blog/${post.slug}`} className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <span className="px-3 py-1 bg-white/90 text-xs font-semibold text-gray-700 rounded-full">{post.category}</span>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
              </div>
              <h3 className="font-heading font-semibold text-gray-900 mb-2 group-hover:text-brand transition-colors">{post.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-400 flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                <span className="text-brand text-sm font-medium group-hover:gap-2 transition-all inline-flex items-center gap-1">Read More <ArrowRight className="w-3.5 h-3.5" /></span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
