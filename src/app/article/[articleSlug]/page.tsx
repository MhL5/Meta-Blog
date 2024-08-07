import GradientUnderlineText from "@/components/ui/GradientUnderlineText";
import NewsLetterSubscription from "@/features/newsLetterSubscription/NewsLetterSubscription";
import RenderMarkdown from "@/features/react-md-editor/RenderMarkdown";
import { cachedAuth } from "@/lib/auth";
import prismaClient from "@/lib/prismaClient";
import { Metadata } from "next";
import { Session } from "next-auth";
import { notFound } from "next/navigation";
import { cache } from "react";
import { z } from "zod";
import ArticleButtons from "./ArticleButtons";
import ArticleContextProvider from "./ArticleContext";
import ArticleInfo from "./ArticleInfo";
import CommentsList from "./CommentsList";
import YouMightAlsoLike from "./YouMightAlsoLike";

type PageProps = {
  params: { articleSlug: string };
};

// todo: USE GET STATIC PROPS TO to make it static
// todo: revalidate 15m
// TODO: REMOVE CARD BG

const getArticle = cache(async (articleSlug: string) => {
  const article = await prismaClient.article.findUnique({
    where: { slug: articleSlug },
    include: {
      articleComments: {
        include: { user: { select: { id: true, name: true, image: true } } },
      },
      author: true,
      articleLikes: true,
      favoriteArticle: true,
    },
  });

  if (!article) return notFound();
  return article;
});

const getYouMightAlsoLikeArticles = cache(
  async ({ tags, curArticleId }: { tags: string[]; curArticleId: string }) => {
    // Query for the first 3 articles with similar tags
    let similarArticles = [];

    similarArticles = await prismaClient.article.findMany({
      where: {
        tags: {
          hasSome: tags,
        },
        id: {
          not: curArticleId,
        },
      },
      take: 3,
      include: { author: true },
    });

    // If no similar articles are found, query for the first 3 articles
    if (similarArticles.length < 3) {
      similarArticles = await prismaClient.article.findMany({
        take: 3,
        include: { author: true },
        where: {
          id: {
            not: curArticleId,
          },
        },
      });
    }

    return similarArticles;
  },
);

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
  const session = await cachedAuth();
  const article = await getArticle(articleSlug);
  const youMightAlsoLikeArticles = await getYouMightAlsoLikeArticles({
    curArticleId: article.id,
    tags: article.tags,
  });

  const curUser = session ? validateUser(session) : null;

  const articleInfoProps = {
    avatar: article.avatar,
    authorImgUrl: article.author.image || "",
    authorName: article.author.name || "Unknown",
    createdAt: article.createdAt,
    readingTime: article.readingTime,
    articleLikesLength: article.articleLikes.length,
    articleCommentsLength: article.articleComments.length,
    favoriteArticleLength: article.favoriteArticle.length,
    tags: article.tags,
    category: article.category,
  };

  return (
    <ArticleContextProvider article={article} loggedInUserSession={curUser}>
      <article className="relative mx-auto w-full max-w-4xl">
        <ArticleInfo {...articleInfoProps} />

        <section className="mb-14">
          <h1 className="text-balance text-4xl font-bold">
            <GradientUnderlineText className="leading-normal">
              {article.title}
            </GradientUnderlineText>
          </h1>
        </section>

        <section>
          <RenderMarkdown markdown={article.content} />
        </section>

        <CommentsList />

        <ArticleButtons />

        <YouMightAlsoLike articles={youMightAlsoLikeArticles} />
      </article>

      <NewsLetterSubscription />
    </ArticleContextProvider>
  );
}

function validateUser(session: Session) {
  const user = {
    // todo: hacky way to solve this issue temp need to be fixed
    image: `${!!session?.user?.image ? session.user.image : ""}`,
    name: session?.user?.name,
    id: session?.user?.id,
  };
  // todo: temp need to be fixed: i have 2 duplicate user schemas
  const userSchema = z.object({
    image: z.string(),
    name: z.string(),
    id: z.string().min(1),
  });

  const validUser = userSchema.safeParse(user);

  if (validUser.success) return validUser.data;
  return null;
}
