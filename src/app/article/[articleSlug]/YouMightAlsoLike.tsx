import MiniCard from "@/components/MiniCard";
import { Article } from "@prisma/client";
import Link from "next/link";

type YouMightAlsoLikeProps = {
  articles: Article[];
};

export default function YouMightAlsoLike({ articles }: YouMightAlsoLikeProps) {
  return (
    <section className="mt-16">
      <div className="text-2xl font-bold">You might also like</div>
      <div className="mt-8 grid max-w-7xl grid-cols-3 items-stretch gap-4">
        {articles.map((article) => {
          return (
            <Link
              key={article.id}
              href={`/article/${article.slug}`}
              className="h-full w-full"
            >
              <MiniCard
                article={{
                  title: article.title,
                  readingTime: String(article.readingTime),
                  avatar: article.avatar || "",
                  category: article.category,
                }}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
