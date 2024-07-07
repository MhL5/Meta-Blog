import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

type TextGradientProps = PropsWithChildren & ComponentPropsWithoutRef<"span">;

export default function TextGradient({
  children,
  ...props
}: TextGradientProps) {
  return (
    <span
      className="from-[hsl(222deg,86%,53%)] to-[hsl(281deg,100%,55%)] bg-gradient-to-r bg-clip-text text-transparent capitalize"
      {...props}
    >
      {children}
    </span>
  );
}
