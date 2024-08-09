import ArticleCard from "@/components/ArticleCard";
import { PageProps } from "./page";
import { getAuthor } from "./services";

type ArticleCardsProps = {
  authorId: string;
  searchParams: PageProps["searchParams"];
}

export default async function ArticleCards({ authorId, searchParams }: ArticleCardsProps) {
  const author = await getAuthor({
    authorId,
    searchParams,
  });

  return (
    <>
      {author.author.Articles.map((article) => {
        return <ArticleCard key={article.id} article={article} />;
      })}
    </>
  );
}
