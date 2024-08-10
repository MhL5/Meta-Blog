"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { Categories } from "@prisma/client";
import { CircleChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { z } from "zod";
import CloudinaryImage from "./CloudinaryImage";
import CategoryBadge from "./ui/categoryBadge";
import { Skeleton } from "./ui/skeletion";

const SearchResultSchema = z.object({
  status: z.literal("success"),
  data: z.object({
    searchResult: z.array(
      z.object({
        id: z.string(),
        avatar: z.string(),
        title: z.string(),
        slug: z.string(),
      }),
    ),
  }),
});
type SearchResultSchemaType = z.infer<typeof SearchResultSchema>;

export default function ArticleSearch() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResultSchemaType | null>(null);
  const [error, setError] = useState("");
  const query = useDebouncedValue(inputValue, 500);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    async function getSearchResults() {
      try {
        setIsLoading(true);
        setError("");
        setResults(null);

        const res = await fetch(`/api/search`, {
          method: "POST",
          signal: abortController.signal,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });
        if (!res.ok) throw new Error(res.statusText);

        const data = await res.json();
        if (data?.status === "fail") throw new Error("");

        const validData = SearchResultSchema.parse(data);
        setResults(validData);
      } catch {
        setError(
          "Something went wrong while searching! feel free to contact support.",
        );
      } finally {
        setIsLoading(false);
      }
      if (!query) return;
    }
    getSearchResults();

    return () => abortController.abort();
  }, [query]);

  return (
    <div className="relative ml-auto flex-1 md:grow-0">
      <div
        className="flex w-full max-w-96 justify-between space-x-8 rounded-lg border px-3 py-1 pr-1 text-sm text-muted-foreground sm:w-64"
        onClick={() => setOpen((o) => !o)}
      >
        <p className="hover:text-slate-300">Search....</p>
        <span className="pointer-events-none rounded bg-muted px-1.5 font-mono text-sm text-muted-foreground">
          CTRL J
        </span>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="example: gitignore #gitignore @version_control"
          value={inputValue}
          onValueChange={setInputValue}
        />

        <CategoriesList
          onCategoryClick={(category) => {
            setInputValue((curInput) => `${curInput} ${category}`);
          }}
        />

        <CommandList>
          {!results?.data && (
            <CommandEmpty>
              {!!error ? (
                `No results found.`
              ) : (
                <span className="text-red-500">{error}</span>
              )}
            </CommandEmpty>
          )}

          {!isLoading &&
            results?.data &&
            results?.data?.searchResult.length < 1 && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}

          {isLoading && (
            <ul className="space-y-4 rounded-lg border border-transparent p-2">
              <li className="flex gap-4">
                <Skeleton className="h-12 w-12" />
                <div className="flex w-full flex-col gap-3">
                  <Skeleton className="h-6 w-[60%] basis-1/2" />
                  <Skeleton className="h-6 w-full basis-1/2" />
                </div>
              </li>
            </ul>
          )}

          {!isLoading && !!results?.data && (
            <ul className="mt-1 font-semibold">
              {results.data.searchResult.map((res) => {
                return (
                  <li key={res.id}>
                    <Link
                      href={`/article/${res.slug}`}
                      className="custom-hover || flex gap-4 border p-2 !shadow-none"
                      onClick={() => setOpen((s) => !s)}
                    >
                      <CloudinaryImage
                        src={res.avatar}
                        width={40}
                        height={40}
                        alt="search result avatar"
                        className="h-8 w-8 rounded-xl object-cover outline outline-[0.1px] outline-slate-300"
                      />
                      <span className="text-sm"> {res.title} </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </CommandList>
      </CommandDialog>
    </div>
  );
}

function CategoriesList({
  onCategoryClick,
}: {
  onCategoryClick: (category: string) => void;
}) {
  const CategoriesArr = Object.keys(Categories) as (keyof typeof Categories)[];
  const [extend, setExtend] = useState(false);
  const categoriesOptions = extend ? CategoriesArr : CategoriesArr.slice(0, 3);

  return (
    <div className="flex w-full items-center px-2 py-3">
      <ul className="flex flex-wrap items-center gap-x-1 gap-y-3 pr-1 text-xs">
        {categoriesOptions.map((category) => (
          <li key={category} className="cursor-pointer">
            <CategoryBadge
              onClick={() => onCategoryClick(`@${category}`)}
              variant={category}
              className="custom-hover || inline-block"
            >
              @{category}
            </CategoryBadge>
          </li>
        ))}
      </ul>

      <button
        title="show all categories options"
        className="ml-auto cursor-pointer self-start"
        onClick={() => {
          setExtend((e) => !e);
        }}
      >
        <CircleChevronDown className="h-6 w-6 duration-300 hover:text-purple-500" />
      </button>
    </div>
  );
}
