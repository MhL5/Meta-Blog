import { ComponentPropsWithoutRef, type ReactElement } from "react";
import { useGetAuthors } from "../../../hooks/useGetAuthors";
import AuthorsCard from "./AuthorsCard";

type AuthorsProps = ComponentPropsWithoutRef<"div">;
function Authors(props: AuthorsProps): ReactElement {
  const { authors, error, isLoading } = useGetAuthors();

  const { className, ...otherProps } = props;

  if (isLoading) return <span>loading...</span>;
  if (error || !authors) return <span>Error</span>;
  return (
    <div className={`${className} || max-w-globalWidthContent`} {...otherProps}>
      {authors.map((author) => (
        <AuthorsCard {...author} key={author.id} />
      ))}
    </div>
  );
}

export default Authors;
