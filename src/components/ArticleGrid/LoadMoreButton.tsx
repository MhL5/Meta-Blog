"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

const pageSchema = z.number().min(1);

export default function LoadMoreButton({ className, ...props }: ButtonProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  const curPage = searchParams.get("page") ?? "1";
  const curPageNum = String(pageSchema.safeParse(+curPage).data || `1`);

  function handleLoadMore() {
    setIsLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set("page", `${+curPageNum + 1}`);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  useEffect(() => {
    setIsLoading(false);
  }, [searchParams]);

  return (
    <Button className={`${className}`} {...props} onClick={handleLoadMore}>
      {isLoading ? "loading ...." : `Load More`}
    </Button>
  );
}
