import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      category: true,
      instructor: { select: { id: true, name: true, image: true } },
      lessons: { orderBy: { order: "asc" } },
    },
  });
  if (!course) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(course);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const data = await req.json();
  const course = await prisma.course.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      description: data.description,
      shortDescription: data.shortDescription,
      price: data.price,
      level: data.level,
      image: data.image,
      duration: data.duration,
      language: data.language,
      categoryId: data.categoryId,
      published: data.published,
      featured: data.featured,
    },
  });
  return NextResponse.json(course);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.course.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
