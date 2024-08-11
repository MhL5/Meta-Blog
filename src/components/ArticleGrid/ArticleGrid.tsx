import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import ListContainer from "./ListContainer";
import ListItem from "./ListItem";
import LoadMoreButton from "./LoadMoreButton";
import SortButtons from "./SortButton";

type CardListProps = PropsWithChildren & ComponentPropsWithoutRef<"section">;

/**
 * This is a compound component for rendering article cards with sort buttons and load more button
 * if you need more customization you should use this component instead of `ArticleGridCards` which is a wrapper around this component with some default styles
 * @example you can use `ArticleGridCards` an example of how to use it
 */
export default function ArticleGrid({
  children,
  className,
  ...props
}: CardListProps) {
  return (
    <section className={cn("", className)} {...props}>
      {children}
    </section>
  );
}

ArticleGrid.SortButtons = SortButtons;
ArticleGrid.LoadMoreButton = LoadMoreButton;
ArticleGrid.ListContainer = ListContainer;
ArticleGrid.ListItem = ListItem;
