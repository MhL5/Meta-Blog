import RenderMarkdown from "@/features/markdown/RenderMarkdown";
import prismaClient from "@/lib/prismaClient";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

type PageProps = {
  params: { articleSlug: string };
};

const getArticle = cache(async (articleSlug: string) => {
  const article = await prismaClient.article.findUnique({
    where: { slug: articleSlug },
  });

  if (!article) return notFound();
  return article;
});

export async function generateMetadata({
  params: { articleSlug },
}: PageProps): Promise<Metadata> {
  const { title, content, avatar } = await getArticle(articleSlug);

  return {
    title,
    description: content.slice(0, 100) + "... Read more",
    openGraph: { images: [{ url: avatar }] },
  };
}

// TODO: not even close to done
export default async function Page({ params: { articleSlug } }: PageProps) {
  const { content } = await getArticle(articleSlug);

  return (
    <>
      <h1>Hello, Next.js!</h1>
      <RenderMarkdown markdown={content} />
    </>
  );
}
