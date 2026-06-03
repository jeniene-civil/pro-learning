"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import { MessageSquare, Users, Lightbulb, MessageCircle, ChevronRight } from "lucide-react";

const forums = [
  { title: "Structural Analysis & Design", posts: "2.4K", topics: "856" },
  { title: "ETABS & SAP2000 Discussion", posts: "3.1K", topics: "1,024" },
  { title: "Geotechnical Engineering", posts: "1.2K", topics: "423" },
  { title: "Construction Management", posts: "980", topics: "312" },
  { title: "Career & Professional Development", posts: "1.8K", topics: "654" },
  { title: "Study Groups & Exam Prep", posts: "2.7K", topics: "891" },
];

const qaItems = [
  { q: "How to model a 3-story RC building in ETABS?", answers: 5, votes: 12 },
  { q: "Difference between ACI 318-19 and Eurocode 2 for shear design?", answers: 3, votes: 8 },
  { q: "Recommended resources for SE exam preparation?", answers: 7, votes: 15 },
];

export default function CommunityPage() {
  const locale = useLocale();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="text-center mb-10">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Community</h1>
        <p className="text-gray-500">Connect with fellow engineers, ask questions, and share knowledge</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Forums */}
        <div className="lg:col-span-2">
          <h2 className="font-heading text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-brand" /> Discussion Forums
          </h2>
          <div className="space-y-2">
            {forums.map(forum => (
              <div key={forum.title} className="bg-white rounded-xl border border-border p-4 hover:shadow-md transition-shadow flex items-center justify-between cursor-pointer">
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">{forum.title}</h3>
                  <p className="text-xs text-gray-400">{forum.topics} topics &bull; {forum.posts} posts</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Q&A Sidebar */}
        <div>
          <div className="bg-white rounded-2xl border border-border p-6 sticky top-24">
            <h2 className="font-heading text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" /> Top Questions
            </h2>
            <div className="space-y-4">
              {qaItems.map((item, i) => (
                <div key={i} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <p className="text-sm text-gray-700 mb-2 cursor-pointer hover:text-brand transition-colors">{item.q}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span>🗳️ {item.votes} votes</span>
                    <span>💬 {item.answers} answers</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2.5 bg-brand text-white text-sm font-semibold rounded-lg hover:bg-brand-700 transition-colors">Ask a Question</button>
          </div>
        </div>
      </div>
    </div>
  );
}
