"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PropsWithChildren } from "react";

export type SortSearchParam =
  | "latest"
  | "oldest"
  | "most-liked"
  | "most-favorite"
  | string;

type ButtonProps = PropsWithChildren<{
  filter: SortSearchParam;
  activeFilter: string;
  handleFilter: (filter: SortSearchParam) => void;
  className?: string;
}>;

const sortButtonsArr = [
  { filter: "latest", text: "Latest" },
  { filter: "oldest", text: "Oldest" },
  { filter: "most-liked", text: "Most Liked" },
  { filter: "most-favorite", text: "Most Favorite" },
];

export default function SortButtons() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("sort") ?? "latest";

  function handleFilter(filter: SortSearchParam) {
    const params = new URLSearchParams(searchParams);
    params.set("sort", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border-primary-800 flex w-fit rounded-lg border bg-muted px-1 py-[0.2rem] text-sm">
      {sortButtonsArr.map(({ filter, text }, i) => {
        return (
          <SortButton
            key={filter + text}
            filter={filter}
            handleFilter={handleFilter}
            activeFilter={activeFilter}
            className={`${i === 0 && "rounded-l-lg"} ${i === sortButtonsArr.length - 1 && "rounded-r-md"}`}
          >
            {text}
          </SortButton>
        );
      })}
    </div>
  );
}

function SortButton({
  className,
  filter,
  handleFilter,
  activeFilter,
  children,
}: ButtonProps) {
  return (
    <button
      className={`${className} inline-block rounded-lg px-2 py-2 text-sm font-semibold capitalize hover:bg-muted-foreground sm:px-5 sm:py-2 ${
        filter === activeFilter ? "bg-background text-primary shadow-lg" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
