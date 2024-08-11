import ArticleCard from "@/components/ArticleCard";
import ArticleGridWrapper from "@/components/ArticleGridWrapper";
import NewsLetterSubscription from "@/features/newsLetterSubscription/NewsLetterSubscription";
import { Metadata } from "next";
import { Suspense } from "react";
import AuthorSection from "./AuthorSection";
import { getAuthor } from "./services";

type SortOptions = "latest" | "oldest" | "most-liked" | "most-favorite";
export type SearchParams = {
  sort?: SortOptions;
  page?: string;
};
export type PageProps = {
  params: { authorId: string };
  searchParams?: SearchParams;
};

export async function generateMetadata({
  params: { authorId },
}: PageProps): Promise<Metadata> {
  const data = await getAuthor({ authorId });

  return {
    title: `${data.author.name} - Author Page`,
    description: `Explore articles by ${data.author.name}`,
    openGraph: {
      images: [data.author.image || "/meta-blog-thumbnail.png"],
      type: "profile",
    },
  };
}

export default async function Page({
  searchParams,
  params: { authorId },
}: PageProps) {
  return (
    <main className="mx-auto my-14 w-full max-w-7xl">
      <div className="mb-16">
        <Suspense fallback={<div>Loading...</div>}>
          <AuthorSection authorId={authorId} />
        </Suspense>
      </div>

      <ArticleGridWrapper
        mode="async"
        suspenseKey={searchParams?.sort || ""}
        data={async () => {
          const { author } = await getAuthor({
            authorId,
            searchParams,
          });

          return author.Articles;
        }}
        render={(articles) => {
          return <ArticleCard key={articles.id} article={articles} />;
        }}
      />

      <div className="mb-14 mt-44">
        <NewsLetterSubscription />
      </div>
    </main>
  );
}
