import { cn } from "@/utils/cn";
import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

type GradientUnderlineTextProps = PropsWithChildren &
  ComponentPropsWithoutRef<"span">;

export default function GradientUnderlineText({
  children,
  className,
  ...props
}: GradientUnderlineTextProps) {
  return (
    <span className={cn("gradient-underline-animation", className)} {...props}>
      {children}
    </span>
  );
}
