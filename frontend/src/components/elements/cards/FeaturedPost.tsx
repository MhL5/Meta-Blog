import { ReactElement } from "react";
import ArticleCard from "./ArticleCard";
import Button from "../button/Button";
import Topics from "./Topics";
import { useGetArticles } from "../../../hooks/useGetArticles";

function FeaturedPost(): ReactElement {
  const { articles, isLoading, error } = useGetArticles();

  if (isLoading) return <span>loading...</span>;
  if (error || !articles) return <span>error</span>;
  return (
    <section className="p-6">
      <div>
        <h2 className="m-auto mb-8 text-center text-5xl font-semibold">
          Most trend Posts
        </h2>
        <div className="m-auto grid max-w-globalWidthContent gap-4 p-4 md:grid-cols-3">
          {articles.map((card, i) =>
            i >= 3 ? null : <ArticleCard {...card} key={card.id} />,
          )}
        </div>
      </div>

      <div className="m-auto mb-14 mt-14 flex max-w-globalWidthContent flex-col items-center justify-center space-y-4">
        <p className="mb-4 text-center text-5xl font-semibold">
          Popular Topics
        </p>
        <Topics />
      </div>

      <div className="m-auto grid max-w-globalWidthContent gap-4 p-4 md:grid-cols-3">
        {articles.map((card) => (
          <ArticleCard {...card} key={card.id} />
        ))}
      </div>

      <div className="flex">
        <Button variant="primary" className="m-auto mt-6" el="button">
          Load more
        </Button>
      </div>
    </section>
  );
}

export default FeaturedPost;
