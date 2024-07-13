"use client";

import { PropsWithChildren, ReactElement, useEffect, useState } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Skeleton } from "./ui/skeletion";

type ToggleThemeProps = PropsWithChildren & ButtonProps;

function ToggleTheme({
  children,
  className,
  ...props
}: ToggleThemeProps): ReactElement {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <Skeleton className="h-6 w-6" />;

  return (
    <Button
      variant="ghost"
      type="button"
      onClick={() =>
        setTheme(() => {
          return resolvedTheme === "dark" ? "light" : "dark";
        })
      }
      className={`${className}`}
      {...props}
    >
      {children}
      {resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}

export default ToggleTheme;
