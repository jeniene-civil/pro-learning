"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, User, Clock, Tag, Share2, Bookmark } from "lucide-react";

const posts = {
  "etabs-2025-tutorial": {
    title: "ETABS 2025: New Features & Tutorial for Structural Engineers",
    author: "Dr. Ahmed Hassan, PE",
    date: "March 15, 2025",
    readTime: "8 min",
    category: "Software",
    content: `
ETABS 2025 introduces several groundbreaking features that will transform how structural engineers approach building analysis and design.

## What's New in ETABS 2025?

The latest version brings enhanced BIM integration, allowing seamless import and export with Revit and other BIM platforms. The new seismic analysis engine provides more accurate results for complex structures.

## Key Features

### 1. Enhanced BIM Integration
Direct bi-directional link with Revit 2025 supports transfer of analytical models, including complex curved geometry and composite decks.

### 2. Performance-Based Design Wizard
The new wizard guides engineers through the entire PBSD process, from defining performance objectives to evaluating results.

### 3. Cloud Collaboration
Teams can now work simultaneously on the same model with real-time synchronization.

## Getting Started

To begin with ETABS 2025, start with our comprehensive course covering everything from basic modeling to advanced seismic analysis.

Pro Learning offers 12 specialized ETABS courses ranging from beginner to advanced levels.
    `.trim()
  },
};

export default function BlogPostPage() {
  const locale = useLocale();
  const params = useParams();
  const slug = params.post as string;
  const post = posts[slug as keyof typeof posts];

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="font-heading text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
        <Link href={`/${locale}/blog`} className="text-brand hover:underline">← Back to Blog</Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
      <Link href={`/${locale}/blog`} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-brand mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Blog
      </Link>

      <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
        <span className="px-2 py-0.5 bg-brand-50 text-brand text-xs font-medium rounded-full">{post.category}</span>
        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
      </div>

      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">{post.title}</h1>

      <div className="flex items-center gap-3 pb-6 mb-8 border-b border-gray-200">
        <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-white text-sm font-bold">AH</div>
        <div>
          <p className="text-sm font-medium text-gray-900">{post.author}</p>
          <p className="text-xs text-gray-500">Structural Engineer & Instructor</p>
        </div>
        <div className="ml-auto flex gap-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"><Bookmark className="w-4 h-4" /></button>
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"><Share2 className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="prose prose-gray max-w-none">
        {post.content.split('\n').map((line, i) => {
          if (line.startsWith('## ')) return <h2 key={i} className="font-heading text-2xl font-bold text-gray-900 mt-8 mb-4">{line.slice(3)}</h2>;
          if (line.startsWith('### ')) return <h3 key={i} className="font-heading text-xl font-bold text-gray-900 mt-6 mb-3">{line.slice(4)}</h3>;
          if (line.startsWith('- **')) {
            const [, bold, rest] = line.match(/- \*\*(.+?)\*\*(.*)/) || [];
            return <div key={i} className="flex gap-2 ml-4 mb-2"><span className="text-brand mt-1">•</span><div><strong className="text-gray-900">{bold}</strong><span className="text-gray-600">{rest}</span></div></div>;
          }
          if (line.startsWith('- ')) return <li key={i} className="text-gray-600 ml-6 mb-1">{line.slice(2)}</li>;
          if (line.match(/^\d\./)) return <li key={i} className="text-gray-600 ml-6 mb-1 list-decimal">{line.replace(/^\d\.\s*/, '')}</li>;
          if (line.trim() === '') return null;
          return <p key={i} className="text-gray-600 mb-4 leading-relaxed">{line}</p>;
        })}
      </div>

      <div className="mt-12 p-6 bg-gradient-to-r from-brand-50 to-brand-100/50 rounded-2xl">
        <h3 className="font-heading font-bold text-gray-900 mb-2">Want to master ETABS?</h3>
        <p className="text-sm text-gray-600 mb-4">Enroll in our ETABS Complete Mastery Course with 186 lessons and 24.5 hours of content.</p>
        <Link href={`/${locale}/courses/etabs-complete-mastery`} className="inline-flex px-5 py-2.5 bg-brand text-white text-sm font-semibold rounded-lg hover:bg-brand-700 transition-colors">View Course →</Link>
      </div>
    </article>
  );
}
