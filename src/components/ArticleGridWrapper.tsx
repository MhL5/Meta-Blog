import { ReactNode, Suspense } from "react";
import ArticleGrid from "./ArticleGrid/ArticleGrid";
import ArticleCard from "./ArticleCard";

type ArticleGridCardsProps<T> =
  | {
      mode: "async";
      suspenseKey: string;
      data: () => Promise<T[]>;
      render: (data: T) => ReactNode;
    }
  | {
      mode: "sync";
      data: T[];
      render: (data: T) => ReactNode;
    };

/**
 * ###
 * this component aims to provide a default layout for articles with less props as possible,
 * if you want more customization, you can use `ArticleGrid`,
 * `ArticleGrid` is a very flexible compound component with everything you need
 */
/**
 * Renders a grid of articles with a default layout and basic controls.
 *
 * Provides a simplified interface for displaying articles compared to the more flexible `ArticleGrid` component.
 *
 * **Props:**
 *   - `suspenseKey`: A key for Suspense component when `mode` is "async".
 *   - `mode`: Either "async" or "sync", indicating data loading mode.
 *   - `data`: An article[] (for "sync") or a Promise<data[]> (for "async").
 *   - `render`: A function to render individual article items.
 */
const ArticleGridWrapper = function <T extends Record<string, any>>(
  props: ArticleGridCardsProps<T>,
) {
  return (
    <ArticleGrid>
      <div className="flex justify-center text-xs sm:justify-end sm:p-3">
        <ArticleGrid.SortButtons />
      </div>

      <ArticleGrid.ListContainer>
        {props.mode === "async" ? (
          <Suspense
            key={props.suspenseKey}
            fallback={<ArticleCard.Skeleton numSkeletons={9} />}
          >
            <ArticleGrid.ListItem
              mode={props.mode}
              data={props.data}
              render={props.render}
            />
          </Suspense>
        ) : (
          <ArticleGrid.ListItem
            mode={props.mode}
            data={props.data}
            render={props.render}
          />
        )}
      </ArticleGrid.ListContainer>

      <div className="mt-8 grid place-items-center">
        <ArticleGrid.LoadMoreButton className="border px-8 transition-all duration-300 hover:px-12" />
      </div>
    </ArticleGrid>
  );
};

export default ArticleGridWrapper;
