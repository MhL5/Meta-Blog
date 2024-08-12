import { cn } from "@/utils/cn";
import { ComponentPropsWithoutRef } from "react";

type CardListUlProps = ComponentPropsWithoutRef<"ul">;

export default function ListContainer({
  className,
  children,
  ...props
}: CardListUlProps) {
  return (
    <ul
      className={cn(
        "grid max-w-7xl items-stretch gap-4 p-2 sm:grid-cols-2 md:grid-cols-3",
        className,
      )}
      {...props}
    >
      {children}
    </ul>
  );
}
