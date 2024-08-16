import { Button } from "@/components/ui/button";
import CategoryIconWrapper from "@/components/ui/categoryIcon";
import GradientUnderlineText from "@/components/ui/GradientUnderlineText";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import MetaBlogCategories from "@/constants/MetaBlogCategories";
import Link from "next/link";

export default function CategoriesSubMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <GradientUnderlineText>
            <NavigationMenuTrigger className="bg-transparent">
              <Link href="/categories">Categories</Link>
            </NavigationMenuTrigger>
          </GradientUnderlineText>

          <NavigationMenuContent>
            <ul className="h-96 divide-y-2 overflow-y-scroll">
              {MetaBlogCategories.map(({ category, id, CategoryIcon }) => {
                return (
                  <li key={id} className="w-full">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start rounded-none"
                      asChild
                    >
                      <Link
                        href={`/categories/${category}`}
                        className="text-start capitalize"
                      >
                        <CategoryIconWrapper
                          variant={category}
                          className="mr-3 p-1"
                        >
                          <CategoryIcon className="h-4 w-4" />
                        </CategoryIconWrapper>

                        <GradientUnderlineText>
                          {category.replaceAll("_", " ")}
                        </GradientUnderlineText>
                      </Link>
                    </Button>
                  </li>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
