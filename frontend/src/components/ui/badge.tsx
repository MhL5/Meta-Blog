import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 tracking-wide",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Custom variants for article tags
        travel:
          "px-3 py-1 capitalize border scale-110 border-[hsla(336,74%,35%,1)] bg-[hsla(336,74%,35%,0.2)]",
        nature:
          "px-3 py-1 capitalize border scale-110 border-[hsl(142,76%,36%)] bg-[hsl(142,76%,36%,0.2)]",
        health:
          "px-3 py-1 capitalize border scale-110 border-[hsl(329,86%,70%)] bg-[hsl(329,86%,70%,0.2)]",
        food: "px-3 py-1 capitalize border scale-110 border-[hsl(273,67%,39%)] bg-[hsl(273,67%,39%,0.2)]",
        technology:
          "px-3 py-1 capitalize border scale-110 border-[hsl(21,90%,48%)] bg-[hsl(21,90%,48%,0.2)]",
        inspiration:
          "px-3 py-1 capitalize border scale-110 border-[hsl(200,98%,39%)] bg-[hsl(200,98%,39%,0.2)]",
        lifeStyle:
          "px-3 py-1 capitalize border scale-110 border-[hsl(226,71%,40%)] bg-[hsl(226,71%,40%,0.2)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { Badge, badgeVariants };
