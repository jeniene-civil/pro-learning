"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Play, CheckCircle, Circle, ChevronDown, ChevronRight,
  Download, FileText, MessageSquare, Bot,
  Maximize2, Monitor, SkipBack, SkipForward, Volume2,
  ArrowLeft, Search, Settings
} from "lucide-react";

export default function LearningPage({ slug }: { slug: string }) {
  const locale = useLocale();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeLesson, setActiveLesson] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"notes" | "downloads" | "qa">("notes");
  const [curriculumOpen, setCurriculumOpen] = useState(true);
  const [expandedSections, setExpandedSections] = useState<number[]>([0]);
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([
    { text: "fc' = 28MPa for concrete compressive strength", time: "4:32" },
    { text: "fy = 420MPa for steel reinforcement yield strength", time: "6:15" },
    { text: "Check minimum steel ratio per ACI 318-19 Section 9.6", time: "8:40" },
  ]);

  useEffect(() => {
    fetch(`/api/courses/slug/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        setCourse(data);
        const firstLesson = data.lessons?.[0];
        if (firstLesson) setActiveLesson(firstLesson);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-brand border-t-transparent rounded-full" />
        <p className="text-gray-500 ml-3 text-sm">Loading course...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-gray-400">Course not found</p>
      </div>
    );
  }

  const sections = course.lessons?.reduce((acc: any[], lesson: any) => {
    const title = lesson.sectionTitle || "General";
    let section = acc.find((s: any) => s.title === title);
    if (!section) {
      section = { title, lessons: [] };
      acc.push(section);
    }
    section.lessons.push(lesson);
    return acc;
  }, []) || [];

  const allLessons = sections.flatMap((s: any) => s.lessons);
  const completedCount = allLessons.filter((l: any) => l.progress?.completed).length;
  const totalLessons = allLessons.length;
  const progressPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const toggleSection = (idx: number) => {
    setExpandedSections(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-4 h-14 bg-gray-900 border-b border-gray-800 shrink-0">
        <div className="flex items-center gap-3">
          <Link href={`/${locale}/courses/${slug}`} className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </Link>
          <span className="text-gray-300 text-sm font-medium hidden sm:inline truncate max-w-md">{course.title}</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"><Search className="w-4 h-4" /></button>
          <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"><Settings className="w-4 h-4" /></button>
          <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white text-xs font-bold">JD</div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left: Curriculum */}
        <aside className={`w-80 bg-gray-900 border-r border-gray-800 overflow-y-auto shrink-0 hidden lg:block ${curriculumOpen ? "" : "hidden"}`}>
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-400">Course Progress</span>
              <span className="text-xs text-brand font-medium">{progressPct}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-1.5">
              <div className="bg-brand rounded-full h-1.5" style={{ width: `${progressPct}%` }} />
            </div>
          </div>
          <div className="p-2 space-y-1">
            {sections.map((section: any, sIdx: number) => (
              <div key={section.title}>
                <button onClick={() => toggleSection(sIdx)} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-800 transition-colors text-left">
                  <div className="flex items-center gap-2 min-w-0">
                    {expandedSections.includes(sIdx) ? <ChevronDown className="w-3.5 h-3.5 text-gray-500 shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-500 shrink-0" />}
                    <div className="min-w-0">
                      <span className="text-sm text-gray-300 truncate block">{section.title}</span>
                      {section.lessons.length > 0 && <span className="text-xs text-gray-500">{section.lessons.length} lessons</span>}
                    </div>
                  </div>
                </button>
                {expandedSections.includes(sIdx) && section.lessons.length > 0 && (
                  <div className="ml-4 space-y-0.5">
                    {section.lessons.map((lesson: any, lIdx: number) => (
                      <div
                        key={lesson.id}
                        onClick={() => setActiveLesson(lesson)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors ${activeLesson?.id === lesson.id ? "bg-brand/10 text-brand" : "hover:bg-gray-800 text-gray-400"}`}
                      >
                        {activeLesson?.id === lesson.id ? <Play className="w-3.5 h-3.5 text-brand shrink-0" /> : <Circle className="w-3.5 h-3.5 text-gray-600 shrink-0" />}
                        <span className={`truncate flex-1 ${activeLesson?.id === lesson.id ? "text-brand" : ""}`}>{lesson.title}</span>
                        <span className="text-xs text-gray-600 shrink-0">{lesson.duration}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Center: Video Player Area */}
        <div className="flex-1 flex flex-col bg-black min-w-0">
          <div className="flex-1 flex items-center justify-center bg-gray-950 relative">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/20 transition-colors">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
              <p className="text-gray-500 text-sm">{activeLesson?.title || "Select a lesson"}</p>
              <p className="text-gray-600 text-xs mt-1">{activeLesson?.duration || ""}</p>
            </div>
          </div>
          {/* Video Controls */}
          <div className="h-16 bg-gray-900 border-t border-gray-800 px-4 flex items-center gap-4 shrink-0">
            <button className="p-1.5 text-gray-400 hover:text-white"><SkipBack className="w-4 h-4" /></button>
            <button className="p-2 bg-white text-gray-900 rounded-full hover:bg-gray-200"><Play className="w-4 h-4 ml-0.5" /></button>
            <button className="p-1.5 text-gray-400 hover:text-white"><SkipForward className="w-4 h-4" /></button>
            <div className="flex-1 h-1 bg-gray-700 rounded-full cursor-pointer relative group">
              <div className="absolute left-0 top-0 h-full bg-brand rounded-full" style={{ width: "35%" }} />
              <div className="absolute left-[35%] top-1/2 -translate-y-1/2 w-3 h-3 bg-brand rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xs text-gray-400 shrink-0">4:32 / 12:45</span>
            <button className="p-1.5 text-gray-400 hover:text-white"><Volume2 className="w-4 h-4" /></button>
            <button className="p-1.5 text-gray-400 hover:text-white"><Monitor className="w-4 h-4" /></button>
            <button className="p-1.5 text-gray-400 hover:text-white"><Maximize2 className="w-4 h-4" /></button>
          </div>
          {/* Lesson Info Bar */}
          <div className="h-12 bg-gray-900 border-t border-gray-800 px-4 flex items-center justify-between shrink-0">
            <p className="text-sm text-gray-300">{activeLesson?.title} &bull; {activeLesson?.duration}</p>
            <button className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors">Mark as Complete ✓</button>
          </div>
        </div>

        {/* Right: Tools Panel */}
        <aside className="w-80 bg-gray-900 border-l border-gray-800 overflow-y-auto hidden xl:block shrink-0">
          {/* Tabs */}
          <div className="flex border-b border-gray-800">
            {[
              { key: "notes" as const, label: "Notes", icon: FileText },
              { key: "downloads" as const, label: "Downloads", icon: Download },
              { key: "qa" as const, label: "Q&A", icon: MessageSquare },
            ].map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-3 text-xs font-medium transition-colors ${activeTab === tab.key ? "text-brand border-b-2 border-brand" : "text-gray-500 hover:text-gray-300"}`}>
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-4">
            {activeTab === "notes" && (
              <div>
                <div className="space-y-3 mb-4">
                  {notes.map((note, i) => (
                    <div key={i} className="bg-gray-800 rounded-lg p-3">
                      <span className="text-xs text-brand font-medium">@{note.time}</span>
                      <p className="text-sm text-gray-300 mt-1">{note.text}</p>
                    </div>
                  ))}
                </div>
                <textarea value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="Add a note with timestamp..." className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm text-gray-300 placeholder-gray-500 resize-none h-20 focus:outline-none focus:border-brand" />
                <button className="w-full mt-2 py-2 bg-brand text-white text-sm font-semibold rounded-lg hover:bg-brand-700 transition-colors">+ Add Note</button>
              </div>
            )}

            {activeTab === "downloads" && (
              <div className="space-y-3">
                {[
                  { name: "RC-Beam-Design-v2.1.xlsx", size: "2.4 MB" },
                  { name: "ACI-318-19-Reference.pdf", size: "8.1 MB" },
                  { name: "ETABS-Model-Example.edb", size: "4.2 MB" },
                ].map(file => (
                  <div key={file.name} className="bg-gray-800 rounded-lg p-3 flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="text-sm text-gray-300 truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">{file.size}</p>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-white shrink-0"><Download className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "qa" && (
              <div>
                <div className="space-y-3 mb-4">
                  {[
                    { q: "Why is fc' taken as 28MPa?", a: "Standard concrete cylinder strength..." },
                    { q: "Minimum steel ratio check?", a: "Per ACI 318-19 Section 9.6.1.2..." },
                  ].map((item, i) => (
                    <div key={i} className="bg-gray-800 rounded-lg p-3">
                      <p className="text-sm text-gray-300 font-medium mb-1">{item.q}</p>
                      <p className="text-xs text-gray-500">{item.a}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full py-2 bg-gray-800 text-gray-300 text-sm font-medium rounded-lg border border-gray-700 hover:bg-gray-750 transition-colors">Ask a Question</button>
              </div>
            )}
          </div>

          {/* AI Assistant */}
          <div className="border-t border-gray-800 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Bot className="w-4 h-4 text-brand" />
              <span className="text-sm text-gray-300 font-medium">AI Assistant</span>
            </div>
            <div className="flex gap-2">
              <input type="text" placeholder="Ask about this lesson..." className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-brand" />
              <button className="p-2 bg-brand rounded-lg hover:bg-brand-700"><Send className="w-4 h-4 text-white" /></button>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile: Toggle curriculum button */}
      <button onClick={() => setCurriculumOpen(!curriculumOpen)} className="lg:hidden fixed bottom-4 left-4 z-50 px-4 py-2 bg-brand text-white text-sm font-semibold rounded-full shadow-lg">
        {curriculumOpen ? "Hide" : "Show"} Curriculum
      </button>
    </div>
  );
}

function Send({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
  );
}
