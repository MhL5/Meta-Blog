import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

type SvgBackgroundProps = PropsWithChildren<{ className?: string }> &
  ComponentPropsWithoutRef<"div">;

export default function SvgBackground({
  children,
  className,
  ...props
}: SvgBackgroundProps) {
  return (
    <main className="min-h-dvh">
      <div
        className={`${className} bg-cover bg-center bg-no-repeat [background-image:url("../assets/heroBackground.svg")] w-full absolute h-dvh -z-50`}
        {...props}
      ></div>
      {children}
    </main>
  );
}
