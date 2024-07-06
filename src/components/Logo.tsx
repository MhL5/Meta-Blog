import { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";
import MetaBlogLogoIcon from "@/app/icon.svg";
import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  title?: string;
  disableLink?: boolean;
} & ComponentPropsWithoutRef<"a">;

function Logo({ title, disableLink = false, className, ...props }: LogoProps) {
  return (
    <Link
      href={disableLink ? "#" : "/"}
      className={`${cn(className, "flex items-center justify-center gap-2")}`}
      {...props}
    >
      <Image src={MetaBlogLogoIcon} width={30} height={30} alt="logo" />
      <span className="font-Kaushan text-lg font-semibold">{title}</span>
    </Link>
  );
}

export default Logo;
