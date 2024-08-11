import CategoryIconWrapper from "@/components/ui/categoryIcon";
import GradientUnderlineText from "@/components/ui/GradientUnderlineText";
import { MetaBlogCategoriesIcon } from "@/constants/MetaBlogCategories";
import { Categories } from "@prisma/client";
import Link from "next/link";

type CategoriesListBoxProps = {
  category: keyof typeof Categories;
  CategoryIcon: MetaBlogCategoriesIcon;
};

export default function CategoriesListBox({
  category,
  CategoryIcon,
}: CategoriesListBoxProps) {
  return (
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
  );
}
