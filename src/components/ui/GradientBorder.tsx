"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

type GradientBorderProps = React.PropsWithChildren &
  React.ComponentPropsWithoutRef<"div">;

/**
 * A React component that applies a gradient border effect to its child elements.
 * This component uses CSS custom properties (--rotation) to dynamically adjust the rotation of the
 * gradient border based on the mouse movement within the element.
 */
export default function GradientBorder({
  children,
  className,
  ...props
}: GradientBorderProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLElement, globalThis.MouseEvent>,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top; // y position within the element
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = x - centerX;
    const deltaY = y - centerY;
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    cardRef.current?.style.setProperty("--rotation", `${angle + 90}deg`);
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "gradient-border-card-animation || bg-background after:bg-background",
        className,
      )}
      onMouseMove={handleMouseMove}
      {...props}
    >
      {children}
    </div>
  );
}
