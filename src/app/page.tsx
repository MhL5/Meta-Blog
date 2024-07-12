import NewsLetterSubscription from "@/features/newsLetterSubscription/NewsLetterSubscription";
import prismaClient from "@/lib/prismaClient";
import ArticleCard from "@/components/ArticleCard";
import CarouselHomepage from "../components/CarouselHomepage";
import HeroHeader from "@/components/layout/HeroHeader";
import PopularTopics from "@/components/PopularTopics";

export default async function Page() {
  const articles = await prismaClient.article.findMany({
    include: {
      author: true,
      articleLikes: true,
      articleComments: true,
      favoriteArticle: true,
    },
  });

  return (
    <div className="mx-auto my-8 w-full max-w-7xl px-2">
      <HeroHeader />

      <section className="my-48 w-full max-w-7xl">
        <CarouselHomepage />
      </section>

      <PopularTopics />

      <div className="m-auto mt-24 grid max-w-7xl items-stretch gap-4 p-2 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => {
          return <ArticleCard key={articles[0].id + i} article={articles[0]} />;
        })}
      </div>

      <section className="mx-auto max-w-7xl">
        <NewsLetterSubscription />
      </section>
    </div>
  );
}
