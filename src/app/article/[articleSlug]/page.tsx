import ArticleButtons from "@/app/article/[articleSlug]/ArticleButtons";
import ArticleInfo from "@/app/article/[articleSlug]/ArticleInfo";
import CommentsList from "@/app/article/[articleSlug]/CommentsList";
import YouMightAlsoLike from "@/app/article/[articleSlug]/YouMightAlsoLike";
import {
  getArticle,
  getYouMightAlsoLikeArticles,
} from "@/app/article/[articleSlug]/services";
import GradientUnderlineText from "@/components/ui/GradientUnderlineText";
import NewsLetterSubscription from "@/features/newsLetterSubscription/NewsLetterSubscription";
import RenderMarkdown from "@/features/react-md-editor/RenderMarkdown";
import { cachedAuth } from "@/lib/auth";
import { markdownToText } from "@/utils/markdownToText";
import { userSchema } from "@/utils/zodSchemas";
import { Metadata } from "next";
import ArticleContextProvider from "./ArticleContext";

type PageProps = {
  params: { articleSlug: string };
};

export async function generateMetadata({
  params: { articleSlug },
}: PageProps): Promise<Metadata> {
  try {
    const article = await getArticle(articleSlug);
    if (!article) throw new Error("Article not found");
    const {
      title,
      content,
      avatar,
      author: { name },
      tags,
    } = article;

    const text = markdownToText({
      markdown: content,
      options: { slice: [0, 100] },
    });

    return {
      title,
      description: text + "... Read more",
      openGraph: { images: [{ url: avatar }] },
      keywords: tags,
      authors: [{ name: String(name) }],
    };
  } catch {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }
}

export default async function Page({ params: { articleSlug } }: PageProps) {
  const session = await cachedAuth();
  const article = await getArticle(articleSlug);
  const youMightAlsoLikeArticles = await getYouMightAlsoLikeArticles({
    curArticleId: article.id,
    category: article.category,
  });

  const curUser = userSchema.safeParse(session?.user).data || null;

  return (
    <ArticleContextProvider article={article} loggedInUserSession={curUser}>
      <article className="relative mx-auto w-full max-w-4xl">
        <ArticleInfo {...article} />

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
