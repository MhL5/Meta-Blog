import MetaBlogCategories from "@/constants/MetaBlogCategories";
import CategoriesListBox from "../CategoriesListBox";
import { BadgeAlert } from "lucide-react";
import { notFound } from "next/navigation";
import CategoryCards from "./CategoryCards";
import { Suspense } from "react";
import ArticleCard from "@/components/ArticleCard";

type PageProps = {
  params: { category: string };
};

const categoryColor = {
  web_development: "bg-blue-200/50 dark:bg-blue-900/50",
  devOps: "bg-red-200/50  dark:bg-red-900/50",
  machine_learning: "bg-yellow-200/50 dark:bg-yellow-900/50",
  data_science: "bg-slate-200/50  dark:bg-slate-900/50",
  cyber_security: " bg-green-200/50  dark:bg-green-900/50 ",
  ui_ux: "bg-pink-200/50 dark:bg-pink-900/50",
  mobile_development: "bg-purple-200/50  dark:bg-purple-900/50",
  game_development: "bg-orange-200/50  dark:bg-orange-900/50",
  artificial_intelligence: "bg-teal-200/50 dark:bg-teal-900/50",
  database_management: "bg-indigo-200/50  dark:bg-indigo-900/50",
  version_control: "bg-cyan-200/50  dark:bg-cyan-900/50",
  testing_and_qa: "bg-lime-200/50 dark:bg-lime-900/50",
  algorithms: "bg-stone-200/50 dark:bg-stone-900/50",
};

export default function Page({ params: { category } }: PageProps) {
  const validCategory = MetaBlogCategories?.find(
    ({ category: ctg }) => ctg === category,
  );
  if (!validCategory) return notFound();
  const Icon = validCategory?.CategoryIcon || BadgeAlert;

  return (
    <>
      <section className="my-24 flex items-center justify-center">
        <div
          className={`${categoryColor[validCategory.category]} scale-150 rounded-lg px-12 py-4 text-3xl capitalize`}
        >
          <CategoriesListBox
            category={validCategory.category}
            CategoryIcon={Icon}
          />
        </div>
      </section>

      <section className="grid max-w-7xl items-stretch gap-4 p-2 sm:grid-cols-2 md:grid-cols-3">
        <Suspense fallback={<ArticleCard.Skeleton numSkeletons={9} />}>
          <CategoryCards category={validCategory.category} />
        </Suspense>
      </section>
    </>
  );
}
