"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Building2, Award, Users, Target } from "lucide-react";

export default function AboutPage() {
  const locale = useLocale();
  const stats = [
    { icon: Building2, value: "200+", label: "Courses" },
    { icon: Users, value: "50,000+", label: "Students" },
    { icon: Award, value: "500+", label: "Resources" },
    { icon: Target, value: "12+", label: "Software Categories" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="font-heading text-4xl font-bold text-gray-900 mb-4">About Pro Learning</h1>
        <p className="text-gray-500 text-lg">
          Pro Learning is the premier online education platform for civil and structural engineers.
          We bridge the gap between academic knowledge and industry practice.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((s) => (
          <div key={s.label} className="text-center bg-white rounded-2xl border border-border p-6">
            <s.icon className="w-8 h-8 mx-auto mb-3 text-brand" />
            <div className="font-heading text-2xl font-bold text-gray-900">{s.value}</div>
            <div className="text-sm text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="prose max-w-3xl mx-auto text-gray-600">
        <h2 className="font-heading text-2xl font-bold text-gray-900">Our Mission</h2>
        <p>
          To provide world-class engineering education that empowers professionals to master
          structural analysis, design software, and industry best practices.
        </p>
        <h2 className="font-heading text-2xl font-bold text-gray-900 mt-8">Why Pro Learning?</h2>
        <p>
          Founded by experienced engineers, we understand what it takes to succeed in the field.
          Our courses are practical, project-based, and taught by industry experts.
        </p>
      </div>
    </div>
  );
}
