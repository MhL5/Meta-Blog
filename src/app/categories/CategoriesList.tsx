import CategoryIconWrapper from "@/components/ui/categoryIcon";
import GradientUnderlineText from "@/components/ui/GradientUnderlineText";
import MetaBlogCategories from "@/constants/MetaBlogCategories";

import Link from "next/link";

type CategoriesListProps = {
  categories: typeof MetaBlogCategories;
};

const categoryColor = {
  web_development: "hover:bg-blue-200/50 dark:hover:bg-blue-900/50",
  devOps: "hover:bg-red-200/50  dark:hover:bg-red-900/50",
  machine_learning: "hover:bg-yellow-200/50 dark:hover:bg-yellow-900/50",
  data_science: "hover:bg-slate-200/50  dark:hover:bg-slate-900/50",
  cyber_security: " hover:bg-green-200/50  dark:hover:bg-green-900/50 ",
  ui_ux: "hover:bg-pink-200/50 dark:hover:bg-pink-900/50",
  mobile_development: "hover:bg-purple-200/50  dark:hover:bg-purple-900/50",
  game_development: "hover:bg-orange-200/50  dark:hover:bg-orange-900/50",
  artificial_intelligence: "hover:bg-teal-200/50 dark:hover:bg-teal-900/50",
  database_management: "hover:bg-indigo-200/50  dark:hover:bg-indigo-900/50",
  version_control: "hover:bg-cyan-200/50  dark:hover:bg-cyan-900/50",
  testing_and_qa: "hover:bg-lime-200/50 dark:hover:bg-lime-900/50",
  algorithms: "hover:bg-stone-200/50 dark:hover:bg-stone-900/50",
};

export default function CategoriesList({ categories }: CategoriesListProps) {
  return (
    <>
      {categories.map(({ category, id, CategoryIcon }) => {
        return (
          <div
            key={id}
            className={`${categoryColor?.[category]} cursor-pointer list-none rounded-lg py-4 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-[6px]`}
          >
            <Link href={`/categories/${category}`}>
              <div className="flex w-full items-center justify-center">
                <CategoryIconWrapper variant={category} className="p-3">
                  <CategoryIcon />
                </CategoryIconWrapper>
              </div>
              <div className={`mb-1 mt-4 font-semibold capitalize`}>
                <GradientUnderlineText>
                  {category.replaceAll("_", " ")}
                </GradientUnderlineText>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
}
