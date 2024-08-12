import ArticleCard from "@/components/ArticleCard";
import ArticleGridWrapper from "@/components/ArticleGridWrapper";
import MetaBlogCategories, {
  categoryBgColor,
} from "@/constants/MetaBlogCategories";
import { BadgeAlert } from "lucide-react";
import { notFound } from "next/navigation";
import CategoriesListBox from "../CategoriesListBox";
import { getCategoryArticles } from "./services";
import { SearchParams } from "@/@types/customType";

type PageProps = {
  params: { category: string };
  searchParams: SearchParams;
};

export default function Page({
  params: { category },
  searchParams,
}: PageProps) {
  const validCategory = MetaBlogCategories?.find(
    ({ category: ctg }) => ctg === category,
  );
  if (!validCategory) return notFound();
  const Icon = validCategory?.CategoryIcon || BadgeAlert;

  return (
    <>
      <section className="my-24 flex items-center justify-center">
        <div
          className={`${categoryBgColor[validCategory.category]} scale-150 rounded-lg px-12 py-4 text-3xl capitalize`}
        >
          <CategoriesListBox
            category={validCategory.category}
            CategoryIcon={Icon}
          />
        </div>
      </section>

      <ArticleGridWrapper
        mode="async"
        data={async () => await getCategoryArticles({ category, searchParams })}
        render={(article) => <ArticleCard key={article.id} article={article} />}
        suspenseKey={`${category}`}
      />
    </>
  );
}
