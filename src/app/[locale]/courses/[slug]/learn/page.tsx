import LearningPage from "@/components/learning/LearningPage";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <LearningPage slug={slug} />;
}
