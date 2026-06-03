"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useState } from "react";
import { Search, Star, Download, FileSpreadsheet, ArrowRight } from "lucide-react";

const tools = [
  { title: "RC Beam & Column Design Suite v4.0", category: "structural", rating: 4.9, downloads: "18,400", version: "4.0", compat: "Excel 2019+", isPro: true, featured: true },
  { title: "Footing Design ACI 318 v2.5", category: "structural", rating: 4.8, downloads: "8,200", version: "2.5", compat: "Excel 2019+", isPro: false, featured: false },
  { title: "Shear Wall Design v3.1", category: "structural", rating: 4.7, downloads: "5,100", version: "3.1", compat: "Excel 2019+", isPro: true, featured: false },
  { title: "Mix Design Calculator v2.0", category: "concrete", rating: 4.6, downloads: "3,800", version: "2.0", compat: "Excel 2016+", isPro: true, featured: false },
  { title: "Steel Connection Design v1.8", category: "structural", rating: 4.5, downloads: "2,900", version: "1.8", compat: "Excel 2016+", isPro: true, featured: false },
  { title: "Retaining Wall Design v3.2", category: "structural", rating: 4.7, downloads: "6,200", version: "3.2", compat: "Excel 2019+", isPro: false, featured: false },
  { title: "Slab Design - Two Way v2.1", category: "concrete", rating: 4.6, downloads: "4,500", version: "2.1", compat: "Excel 2016+", isPro: true, featured: false },
  { title: "Project Cost Estimator v1.5", category: "project", rating: 4.4, downloads: "3,200", version: "1.5", compat: "Excel 2016+", isPro: false, featured: false },
  { title: "Telecom Tower Analysis v2.0", category: "telecom", rating: 4.8, downloads: "2,100", version: "2.0", compat: "Excel 2019+", isPro: true, featured: false },
];

const categories = ["All", "Structural Design", "Concrete Technology", "Project Management", "Telecom Structures"];

export default function ToolsPage() {
  const locale = useLocale();
  const [activeCat, setActiveCat] = useState("All");

  const filtered = activeCat === "All" ? tools : tools.filter(t => {
    const map: Record<string, string> = { "Structural Design": "structural", "Concrete Technology": "concrete", "Project Management": "project", "Telecom Structures": "telecom" };
    return t.category === map[activeCat];
  });

  const featured = tools.find(t => t.featured);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="text-center mb-10">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Engineering Excel Tools Library</h1>
        <p className="text-gray-500">300+ Professional Engineering Design Sheets &bull; Updated Monthly</p>
        <div className="relative max-w-xl mx-auto mt-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search tools, categories, keywords..." className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand text-sm" />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCat(cat)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeCat === cat ? "bg-brand text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{cat}</button>
        ))}
      </div>

      {/* Featured */}
      {featured && activeCat === "All" && (
        <div className="bg-white rounded-2xl border border-border p-6 mb-8 hover:shadow-lg transition-shadow">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            <div className="w-full lg:w-48 h-36 bg-gradient-to-br from-brand-50 to-brand-100 rounded-xl flex items-center justify-center shrink-0">
              <FileSpreadsheet className="w-12 h-12 text-brand" />
            </div>
            <div className="flex-1">
              <span className="px-3 py-1 bg-amber-50 text-amber-600 text-xs font-semibold rounded-full mb-2 inline-block">FEATURED</span>
              <h3 className="font-heading text-xl font-bold text-gray-900 mb-1">{featured.title}</h3>
              <p className="text-sm text-gray-500 mb-3">ACI 318-19 | BS 8110 | Eurocode 2</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1 text-amber-500"><Star className="w-4 h-4 fill-current" /> {featured.rating}</span>
                <span>Downloaded {featured.downloads} times</span>
              </div>
              <div className="flex gap-3">
                <button className="px-5 py-2 bg-brand text-white text-sm font-semibold rounded-lg hover:bg-brand-700 transition-colors">{featured.isPro ? "PRO Access" : "Download Now"}</button>
                <button className="px-5 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">Preview</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tools Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(tool => (
          <div key={tool.title} className="bg-white rounded-2xl border border-border p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-brand-50 to-brand-100 rounded-xl flex items-center justify-center mb-4">
              <FileSpreadsheet className="w-6 h-6 text-brand" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center gap-1 text-amber-500 text-sm"><Star className="w-4 h-4 fill-current" /> {tool.rating}</span>
              {tool.isPro ? <span className="ml-auto px-2 py-0.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-semibold rounded-full">PRO</span> : <span className="ml-auto px-2 py-0.5 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-full">FREE</span>}
            </div>
            <h3 className="font-heading font-semibold text-gray-900 mb-1">{tool.title}</h3>
            <p className="text-xs text-gray-400 mb-3">v{tool.version} | {tool.compat}</p>
            <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
              <span>📥 {tool.downloads} downloads</span>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-2 text-sm font-semibold text-white bg-brand rounded-lg hover:bg-brand-700 transition-colors">{tool.isPro ? "Get Access" : "Download"}</button>
              <button className="px-4 py-2 border border-gray-200 text-gray-600 text-sm rounded-lg hover:bg-gray-50 transition-colors">Preview</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
