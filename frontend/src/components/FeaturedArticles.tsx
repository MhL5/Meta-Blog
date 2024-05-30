import { useGetArticles } from "@/hooks/useGetArticles";
import Spinner from "./ui/Spinner";
import { Button } from "./ui/button";
import ArticleCard from "./ArticleCard";

export default function FeaturedArticles() {
  const { articles, isLoading } = useGetArticles();

  if (isLoading)
    return (
      <div className="m-40 grid place-items-center">
        Loading articles
        <Spinner className="h-16 w-16" />
      </div>
    );
  return (
    <div>
      <section className="p-6">
        <div>
          <h2 className="m-auto mb-8 text-center text-5xl font-semibold">
            Most trend articles
          </h2>
          <div className="m-auto grid max-w-globalWidthContent gap-4 p-4 md:grid-cols-3">
            {articles?.data?.slice(6).map((article) => {
              return <ArticleCard key={article._id} article={article} />;
            })}
          </div>
        </div>

        <div className="m-auto mb-14 mt-14 flex max-w-globalWidthContent flex-col items-center justify-center space-y-4">
          <p className="mb-4 text-center text-5xl font-semibold">
            Popular Topics
          </p>
          topic place holder
          {/* <Topics /> */}
        </div>

        <div className="m-auto grid max-w-globalWidthContent items-stretch tests gap-4 p-4 md:grid-cols-3">
          {articles?.data?.map((article) => {
            return <ArticleCard key={article._id} article={article} />;
          })}
        </div>

        <div className="flex">
          <Button className="mx-auto mt-4">Load more</Button>
        </div>
      </section>
    </div>
  );
}
