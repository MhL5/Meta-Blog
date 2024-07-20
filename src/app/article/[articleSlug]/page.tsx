import RenderMarkdownWithSanitization from "@/features/markdown/RenderMarkdownWithSanitization";
import NewsLetterSubscription from "@/features/newsLetterSubscription/NewsLetterSubscription";
import prismaClient from "@/lib/prismaClient";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import ArticleButtons from "./ArticleButtons";
import ArticleInfo from "./ArticleInfo";
import CommentsList from "./CommentsList";
import YouMightAlsoLike from "./YouMightAlsoLike";

type PageProps = {
  params: { articleSlug: string };
};

// todo: USE GET STATIC PROPS TO to make it static
// todo: revalidate 15m

const getArticle = cache(async (articleSlug: string) => {
  const article = await prismaClient.article.findUnique({
    where: { slug: articleSlug },
    include: {
      articleComments: { include: { user: true } },
      author: true,
      articleLikes: true,
      favoriteArticle: true,
    },
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

export default async function Page({ params: { articleSlug } }: PageProps) {
  const {
    content,
    avatar,
    author,
    createdAt,
    readingTime,
    articleComments,
    articleLikes,
    favoriteArticle,
    tags,
    id,
    title,
  } = await getArticle(articleSlug);

  const articleInfoProps = {
    avatarUrl: avatar,
    authorImgUrl: author.image || "",
    authorName: author.name || "Unknown",
    createdAt,
    readingTime,
    articleLikesLength: articleLikes.length,
    articleCommentsLength: articleComments.length,
    favoriteArticleLength: favoriteArticle.length,
    tags,
  };

  return (
    <>
      <article className="relative mx-auto w-full max-w-4xl">
        <ArticleInfo {...articleInfoProps} />

        <section className="mb-14">
          <h1 className="text-balance text-4xl font-bold"> {title} </h1>
        </section>

        <section>
          <RenderMarkdownWithSanitization markdown={content} />
        </section>

        <CommentsList articleComments={articleComments} articleId={id} />

        <ArticleButtons />

        <YouMightAlsoLike />
      </article>

      <NewsLetterSubscription />
    </>
  );
}
