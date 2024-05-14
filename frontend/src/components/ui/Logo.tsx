import { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { MetaBlogLogoSvgIcon } from "../SvgIcons";

type LogoProps = {
  title?: string;
  disableLink?: boolean;
} & ComponentPropsWithoutRef<"a">;

function Logo({ title, disableLink = false, className, ...props }: LogoProps) {
  const Component = disableLink ? DisableLink : Link;
  return (
    <Component
      to="/"
      className={`${cn(className, "flex items-center justify-center gap-2")}`}
      {...props}
    >
      <MetaBlogLogoSvgIcon />
      <span className="font-Kaushan text-lg font-semibold">{title}</span>
    </Component>
  );
}

function DisableLink({ children }: PropsWithChildren) {
  return <div>{children}</div>;
}

export default Logo;
