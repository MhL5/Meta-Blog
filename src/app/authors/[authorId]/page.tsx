import ArticleCard from "@/components/ArticleCard";
import NewsLetterSubscription from "@/features/newsLetterSubscription/NewsLetterSubscription";
import { Metadata } from "next";
import { Suspense } from "react";
import ArticleCards from "./ArticleCards";
import AuthorSection from "./AuthorSection";
import LoadMoreButton from "./LoadMoreButton";
import { getAuthor } from "./services";
import SortButtons from "./SortButtons";

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

      <section>
        <SortButtons />

        <div className="grid max-w-7xl items-stretch gap-4 p-2 sm:grid-cols-2 md:grid-cols-3">
          <Suspense
            fallback={<ArticleCard.Skeleton numSkeletons={9} />}
            key={`${searchParams?.sort}`}
          >
            <ArticleCards authorId={authorId} searchParams={searchParams} />
          </Suspense>
        </div>
        <div className="mt-8 flex w-full">
          <LoadMoreButton className="mx-auto inline-block" size="lg" />
        </div>
      </section>

      <div className="mb-14 mt-44">
        <NewsLetterSubscription />
      </div>
    </main>
  );
}
