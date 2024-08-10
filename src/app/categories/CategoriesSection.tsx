"use client";

import { Input } from "@/components/ui/input";
import MetaBlogCategories from "@/constants/MetaBlogCategories";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import CategoriesList from "./CategoriesList";

export default function CategoriesSection() {
  const [searchInput, setSearchInput] = useState("");

  const categories = MetaBlogCategories.filter((category) => {
    const categoryString = category.category.toLowerCase().replaceAll("_", " ");
    const searchInputString = searchInput.toLowerCase().trim();

    return categoryString.includes(searchInputString);
  });

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categories</h1>
        <div className="relative w-full max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search categories..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="rounded-md bg-muted py-2 pl-10 pr-4 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 items-stretch gap-6 pt-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        <CategoriesList categories={categories} />
      </div>
    </>
  );
}
