import { ComponentPropsWithoutRef } from "react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { MetaBlogLogoSvgIcon } from "../SvgIcons";

type LogoProps = {
  title?: string;
  disableLink?: boolean;
} & ComponentPropsWithoutRef<"a">;

function Logo({ title, disableLink = false, className, ...props }: LogoProps) {
  return (
    <Link
      to={disableLink ? "#" : "/"}
      className={`${cn(className, "flex items-center justify-center gap-2")}`}
      {...props}
    >
      <MetaBlogLogoSvgIcon />
      <span className="font-Kaushan text-lg font-semibold">{title}</span>
    </Link>
  );
}

export default Logo;
