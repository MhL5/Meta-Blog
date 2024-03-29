import { ReactElement } from "react";
import DefaultPageContainer from "../ui/DefaultPageContainer";
import Header from "../ui/Header";
import { useGetArticles } from "../hooks/useGetArticles";
import ArticleCard from "../ui/ArticleCard";

function Posts(): ReactElement {
  const { articles, error, isLoading } = useGetArticles();

  if (isLoading) return <span>loading...</span>;
  if (error || !articles) return <span>Error</span>;
  return (
    <DefaultPageContainer>
      <Header />
      <h2 className="mt-10 text-center text-7xl font-bold">Posts</h2>
      <div className="m-auto mt-10 grid max-w-globalWidthContent grid-cols-3 gap-8">
        {articles.map((card) => (
          <ArticleCard {...card} key={card.id} />
        ))}
      </div>
    </DefaultPageContainer>
  );
}

export default Posts;
