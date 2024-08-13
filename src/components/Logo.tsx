import MetaBlogLogoIcon from "@/app/icon.svg";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

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
