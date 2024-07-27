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

export default async function Page() {
  const articles = await getArticles();

  return (
    <div className="my-8 px-2">
      <HeroHeader />

      <section className="my-48 w-full max-w-7xl">
        <CarouselHomepage />
      </section>

      <div className="m-auto mt-24 grid max-w-7xl items-stretch gap-4 p-2 sm:grid-cols-2 md:grid-cols-3">
        {articles.map((article) => {
          return <ArticleCard key={article.id} article={article} />;
        })}
      </div>

      <section className="mx-auto max-w-7xl">
        <NewsLetterSubscription />
      </section>
    </div>
  );
}
