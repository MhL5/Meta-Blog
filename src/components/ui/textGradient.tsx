import { cn } from "@/utils/cn";
import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

type TextGradientProps = PropsWithChildren & ComponentPropsWithoutRef<"span">;

export default function TextGradient({
  children,
  className,
  ...props
}: TextGradientProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-[hsl(222deg,86%,53%)] to-[hsl(281deg,100%,55%)] bg-clip-text capitalize text-transparent",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
