import ArticleCard from "@/components/ArticleCard";
import CarouselHomepage from "@/components/CarouselHomepage";
import HeroHeader from "@/components/layout/HeroHeader";
import NewsLetterSubscription from "@/features/newsLetterSubscription/NewsLetterSubscription";
import prismaClient from "@/lib/prismaClient";
import { notFound } from "next/navigation";
import { cache } from "react";

// automatic caching only happens for fetch so here we have cache it manually
const getArticles = cache(async () => {
  const product = await prismaClient.article.findMany({
    include: {
      author: true,
      articleLikes: true,
      articleComments: true,
      favoriteArticle: true,
    },
  });

  if (!product) notFound();
  return product;
});

const getTopFourArticles = cache(async () => {
  const topArticles = await prismaClient.article.findMany({
    orderBy: {
      articleLikes: { _count: "desc" },
    },
    take: 4,
  });

  return topArticles;
});

export default async function Page() {
  const articles = await getArticles();
  const topFourArticles = await getTopFourArticles();

  return (
    <div className="my-8 px-2">
      <HeroHeader />

      <section className="my-20 w-full max-w-7xl">
        <h2 className="mb-8 text-center text-2xl font-bold">
          Most Popular Blogs
        </h2>
        <CarouselHomepage articles={topFourArticles} />
      </section>

      <section className="m-auto mt-40">
        <h2 className="mb-8 text-center text-2xl font-bold">Latest Blogs</h2>
        <div className="grid max-w-7xl items-stretch gap-4 p-2 sm:grid-cols-2 md:grid-cols-3">
          {articles.map((article) => {
            return <ArticleCard key={article.id} article={article} />;
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl">
        <NewsLetterSubscription />
      </section>
    </div>
  );
}
