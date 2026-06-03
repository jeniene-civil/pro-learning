import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  const courses = await prisma.course.findMany({
    include: { category: true, instructor: { select: { id: true, name: true, image: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(courses);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  const course = await prisma.course.create({
    data: {
      title: data.title,
      slug: data.slug,
      description: data.description,
      shortDescription: data.shortDescription,
      price: data.price || 0,
      level: data.level || "ALL_LEVELS",
      image: data.image,
      duration: data.duration,
      language: data.language || "English",
      categoryId: data.categoryId,
      instructorId: (session.user as any).id,
      published: data.published || false,
      featured: data.featured || false,
    },
  });
  return NextResponse.json(course, { status: 201 });
}
