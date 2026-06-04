import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id as string;
  const enrollments = await prisma.enrollment.findMany({
    where: { userId },
    include: {
      course: {
        include: {
          category: true,
          instructor: { select: { name: true } },
          lessons: { orderBy: { order: "asc" } },
          _count: { select: { lessons: true } },
        },
      },
      lessonProgress: true,
    },
    orderBy: { enrolledAt: "desc" },
  });

  return NextResponse.json(enrollments);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { courseId } = await req.json();
  const userId = session.user.id as string;

  const existing = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId } },
  });
  if (existing) {
    return NextResponse.json({ error: "Already enrolled" }, { status: 409 });
  }

  const enrollment = await prisma.enrollment.create({
    data: { userId, courseId },
    include: { course: true },
  });

  return NextResponse.json(enrollment, { status: 201 });
}
