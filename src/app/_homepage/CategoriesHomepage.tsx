import CategoryIconWrapper from "@/components/ui/categoryIcon";
import GradientUnderlineText from "@/components/ui/GradientUnderlineText";
import MetaBlogCategories from "@/constants/MetaBlogCategories";
import Link from "next/link";
import { categoryColor } from "../categories/[category]/page";

export default function CategoriesHomepage() {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-2">
      {MetaBlogCategories.map(({ category, id, CategoryIcon }) => {
        return (
          <li
            key={id}
            className={`${categoryColor[category]} rounded-full border`}
          >
            <Link
              href={`/categories/${category}`}
              className="flex w-fit items-center px-4 py-2 font-semibold capitalize"
            >
              <CategoryIconWrapper variant={category} className="mr-3 p-1">
                <CategoryIcon className="h-4 w-4" />
              </CategoryIconWrapper>

              <GradientUnderlineText>
                @{category.replaceAll("_", " ")}
              </GradientUnderlineText>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
