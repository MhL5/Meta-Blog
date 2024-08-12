import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef } from "react";

type CategoryProps = ComponentPropsWithoutRef<"span"> &
  VariantProps<typeof category> & { removeUnderline?: boolean };

const category = cva(
  "text-nowrap rounded-full border-[0.1px] px-2.5 py-0.5 text-xs capitalize",
  {
    variants: {
      variant: {
        web_development:
          "border-blue-600 bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
        devOps:
          "border-red-600 bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200",
        machine_learning:
          "border-yellow-600 bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
        data_science:
          "border-slate-600 bg-slate-200 text-slate-800 dark:bg-slate-900 dark:text-slate-200",
        cyber_security:
          "border-green-600 bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200",
        ui_ux:
          "border-pink-600 bg-pink-200 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
        mobile_development:
          "border-purple-600 bg-purple-200 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
        game_development:
          "border-orange-600 bg-orange-200 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
        artificial_intelligence:
          "border-teal-600 bg-teal-200 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
        database_management:
          "border-indigo-600 bg-indigo-200 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
        version_control:
          "border-cyan-600 bg-cyan-200 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
        testing_and_qa:
          "border-lime-600 bg-lime-200 text-lime-800 dark:bg-lime-900 dark:text-lime-200",
        algorithms:
          "border-stone-600 bg-stone-200 text-stone-800 dark:bg-stone-900 dark:text-stone-200",
      },
    },
  },
);

export default function CategoryBadge({
  className,
  children,
  variant,
  removeUnderline = true,
  ...props
}: CategoryProps) {
  const label =
    removeUnderline && typeof children === "string"
      ? children?.replaceAll("_", " ")
      : children;

  return (
    <span className={cn(category({ variant }), className)} {...props}>
      @{label}
    </span>
  );
}
