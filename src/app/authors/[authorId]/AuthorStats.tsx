import { Heart, Newspaper, Star } from "lucide-react";

type AuthorStatsProps = {
  favoritesArticlesCount: number;
  articleLikesCount: number;
  ArticlesCount: number;
};

export default function AuthorStats({
  ArticlesCount,
  articleLikesCount,
  favoritesArticlesCount,
}: AuthorStatsProps) {
  const AuthorStats = [
    {
      id: "19db6076ecd4ee4caa17292608b9a229da8ed105",
      label: `${favoritesArticlesCount} favorites`,
      className: ``,
      Icon: Star,
      iconClassNames: `text-yellow-600 dark:text-yellow-500`,
    },
    {
      id: "4f82bd39e15d89a28769fb9b28142b0c636e2189",
      label: `${articleLikesCount} Likes`,
      className: ``,
      Icon: Heart,
      iconClassNames: `text-red-600 dark:text-red-500`,
    },
    {
      id: "7d200c477c01d4f892cd4b78c15df8ff582bfe4a",
      label: `${ArticlesCount} Written articles`,
      className: ``,
      Icon: Newspaper,
      iconClassNames: ``,
    },
  ];

  return (
    <ul className="mb-16 mt-4 flex items-center justify-center space-x-4 divide-x-2">
      {AuthorStats.map(({ id, label, Icon, iconClassNames }) => {
        return (
          <li
            key={id}
            className="flex items-center gap-1 px-1 font-semibold capitalize"
          >
            <Icon className={`${iconClassNames} ml-1 inline-block h-4 w-4`} />
            <span>{label}</span>
          </li>
        );
      })}
    </ul>
  );
}
