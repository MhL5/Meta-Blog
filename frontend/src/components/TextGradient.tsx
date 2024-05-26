import { PropsWithChildren } from "react";

type TextGradientProps = PropsWithChildren;

export default function TextGradient({ children }: TextGradientProps) {
  return (
    <span className="from-gradientColorOne to-gradientColorTwo bg-gradient-to-r bg-clip-text text-transparent capitalize">
      {children}
    </span>
  );
}
