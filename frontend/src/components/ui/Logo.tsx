import { ComponentPropsWithoutRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { MetaBlogLogoSvgIcon } from "../SvgIcons";

type LogoProps = {
  title?: string;
  disableLink?: boolean;
} & ComponentPropsWithoutRef<"a">;
function Logo({ title, disableLink = false, className, ...Props }: LogoProps) {
  return disableLink ? (
    <div
      className={`${cn(className, "flex items-center justify-center gap-2")} `}
    >
      <MetaBlogLogoSvgIcon />
      <span className="text-lg font-semibold font-Kaushan">{title}</span>
    </div>
  ) : (
    <Link
      to="/"
      className={`${cn(className, "flex items-center justify-center gap-2")} `}
      {...Props}
    >
      <MetaBlogLogoSvgIcon />
      <span className="text-lg font-semibold font-Kaushan">{title}</span>
    </Link>
  );
}

export default Logo;
