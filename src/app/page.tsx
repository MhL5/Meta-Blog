import HeroHeader from "@/app/_homepage/HeroHeader";
import { getArticles } from "@/app/_homepage/services";
import TopFourArticlesCarousel from "@/app/_homepage/TopFourArticlesCarousel";
import ArticleCard from "@/components/ArticleCard";
import ArticleGridWrapper from "@/components/ArticleGridWrapper";
import NewsLetterSubscription from "@/features/newsLetterSubscription/NewsLetterSubscription";
import CategoriesHomepage from "@/app/_homepage/CategoriesHomepage";
import { SearchParams } from "@/@types/customType";

type PageProps = {
  searchParams: SearchParams;
};

export default async function Page({ searchParams }: PageProps) {
  return (
    <div className="sm:my-8">
      <HeroHeader />

      <section className="my-20 w-full max-w-7xl">
        <TopFourArticlesCarousel />
      </section>

      <section className="mb-24">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Popular Categories
        </h2>
        <CategoriesHomepage />
      </section>

      <h2 className="mb-8 text-center text-3xl font-bold">Latest Blogs</h2>
      <ArticleGridWrapper
        mode="async"
        data={async () => await getArticles({ searchParams })}
        render={(article) => <ArticleCard key={article.id} article={article} />}
        suspenseKey={`${searchParams?.sort}`}
      />

      <section className="mx-auto max-w-7xl">
        <NewsLetterSubscription />
      </section>
    </div>
  );
}
