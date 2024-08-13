import CategoryIconWrapper from "@/components/ui/categoryIcon";
import GradientUnderlineText from "@/components/ui/GradientUnderlineText";
import MetaBlogCategories, {
  categoryBgColor,
} from "@/constants/MetaBlogCategories";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CategoriesHomepage() {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-2">
      {MetaBlogCategories.slice(0, 5).map(({ category, id, CategoryIcon }) => {
        return (
          <li
            key={id}
            className={`${categoryBgColor[category]} rounded-full border`}
          >
            <Link
              href={`/categories/${category}`}
              className="flex w-fit items-center px-2 py-1 text-sm font-semibold capitalize sm:px-4 sm:py-2 sm:text-base"
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
      <li className={`rounded-full border bg-background`}>
        <Link
          href={`/categories`}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold capitalize sm:text-base"
        >
          <GradientUnderlineText>See More</GradientUnderlineText>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </li>
    </ul>
  );
}
