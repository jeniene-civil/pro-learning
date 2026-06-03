import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST() {
  const cat = await prisma.category.upsert({
    where: { slug: "structural" },
    update: {},
    create: { name: "Structural Engineering", slug: "structural", description: "Analysis, design, and detailing of structures" },
  });
  await prisma.category.upsert({
    where: { slug: "geotechnical" },
    update: {},
    create: { name: "Geotechnical Engineering", slug: "geotechnical", description: "Soil mechanics, foundations, and earthworks" },
  });
  await prisma.category.upsert({
    where: { slug: "bim" },
    update: {},
    create: { name: "BIM & Digital Engineering", slug: "bim", description: "Revit, Navisworks, and digital workflows" },
  });

  const adminPw = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@prolearning.com" },
    update: {},
    create: { name: "Dr. Ahmed Hassan", email: "admin@prolearning.com", password: adminPw, role: "ADMIN" },
  });

  const demoPw = await bcrypt.hash("demo123", 12);
  await prisma.user.upsert({
    where: { email: "student@demo.com" },
    update: {},
    create: { name: "Demo Student", email: "student@demo.com", password: demoPw, role: "STUDENT" },
  });

  const course = await prisma.course.upsert({
    where: { slug: "etabs-complete-mastery" },
    update: {},
    create: {
      title: "ETABS Complete Mastery Course",
      slug: "etabs-complete-mastery",
      description: "Master ETABS from basics to advanced. Learn structural modeling, analysis, design, and detailing using the industry-standard software for building design.",
      shortDescription: "186 lessons covering ETABS from basics to advanced seismic design",
      price: 0,
      level: "ALL_LEVELS",
      duration: "24.5h",
      lessonsCount: 186,
      rating: 4.8,
      studentsCount: 15420,
      language: "English",
      featured: true,
      published: true,
      categoryId: cat.id,
      instructorId: admin.id,
    },
  });

  const sections = [
    { section: "Introduction to ETABS Interface", start: 1, items: [
      { title: "Welcome & Course Overview", duration: "10:25", free: true },
      { title: "ETABS Interface Navigation", duration: "18:40", free: true },
      { title: "Setting Up Your First Project", duration: "22:15", free: false },
    ]},
    { section: "Structural Modeling Basics", start: 4, items: [
      { title: "Grid Systems & Story Data", duration: "15:20", free: false },
      { title: "Material Properties Definition", duration: "12:45", free: false },
      { title: "Frame Sections & Shells", duration: "20:10", free: false },
      { title: "Drawing & Assigning Objects", duration: "18:30", free: false },
    ]},
    { section: "Load Definition & Assignment", start: 8, items: [
      { title: "Dead & Live Loads", duration: "14:00", free: false },
      { title: "Seismic Load Definition (ASCE 7)", duration: "22:30", free: false },
      { title: "Wind Load Analysis", duration: "18:15", free: false },
      { title: "Load Combinations (ACI 318)", duration: "12:00", free: false },
    ]},
    { section: "Analysis & Results", start: 12, items: [
      { title: "Running Analysis", duration: "8:30", free: false },
      { title: "Interpreting Deformed Shapes", duration: "15:45", free: false },
      { title: "Reaction & Force Diagrams", duration: "20:00", free: false },
    ]},
  ];

  for (const section of sections) {
    for (const [i, item] of section.items.entries()) {
      await prisma.lesson.upsert({
        where: { id: `${course.id}-${section.start + i}` },
        update: { title: item.title, duration: item.duration, free: item.free },
        create: {
          id: `${course.id}-${section.start + i}`,
          title: item.title,
          sectionTitle: section.section,
          order: section.start + i,
          duration: item.duration,
          free: item.free,
          courseId: course.id,
        },
      });
    }
  }

  return NextResponse.json({ ok: true, adminEmail: "admin@prolearning.com", adminPassword: "admin123", demoEmail: "student@demo.com", demoPassword: "demo123" });
}
