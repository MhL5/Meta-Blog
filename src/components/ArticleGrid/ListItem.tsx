import { ReactNode } from "react";

type CardListUlItemsProps<T> =
  | {
      mode: "async";
      data: () => Promise<T[]>;
      render: (data: T) => ReactNode;
    }
  | { mode: "sync"; data: T[]; render: (data: T) => ReactNode };

/**
 * because we need Suspense to work, we have to fetch the data here
 * this will be extremely helpful when pre partial rendering from next js becomes stable
 * rn its not very useful for us, but its still a good practice
 */
const ListItem = async function <T extends Record<string, any>>(
  props: CardListUlItemsProps<T>,
) {
  const data = props.mode === "async" ? await props.data() : props.data;

  return <>{data.map(props.render)}</>;
};

export default ListItem;
