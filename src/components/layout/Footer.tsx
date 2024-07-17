import { Button } from "../ui/button";
import Logo from "@/components/Logo";
import Link from "next/link";
import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type FooterProps = { className?: string };
type SvgIconsProps = ComponentPropsWithoutRef<"svg">;

/**
 * A customizable footer component for a React application.
 * This component includes a logo, social media icons, and copyright information.
 * It also provides links to the authors GitHub repository and the original theme author's website.
 */
export default function Footer({ className }: FooterProps) {
  return (
    <div className="mt-8 border-t">
      <footer
        className={`${className} mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 p-8 backdrop-blur-sm sm:flex-row sm:gap-14`}
      >
        <div className="flex flex-col items-start justify-center p-2 text-start text-sm sm:text-base">
          <h3>
            <Logo title="Meta Blog" />
          </h3>
          <p className="mt-4 text-sm font-semibold">
            inspired by{" "}
            <Link
              href="https://porto.gbjsolution.com/"
              className="text-blue-500 underline underline-offset-4"
              target="_blank"
            >
              Ghost theme
            </Link>
            . Developed by{" "}
            <Link
              href="https://github.com/MhL5"
              className="text-blue-500 underline underline-offset-4"
              target="_blank"
            >
              MhL
            </Link>
          </p>
        </div>

        <div className="flex flex-col">
          <div className="mb-2 px-3 text-sm dark:text-white/60">
            <span className="hidden sm:inline">Socials:</span>
            <FooterIcons />
          </div>
        </div>
      </footer>
    </div>
  );
}

function FooterIcons() {
  return (
    <ul className="flex gap-2 sm:mt-6 sm:flex-col sm:gap-4">
      {[
        {
          url: "https://github.com/MhL5",
          icon: <GitHubLogoIcon className="scale-125 dark:fill-white" />,
          label: "github",
          id: "ce48a0309d29adb52623308a4107a1d70d690b507fe814145483",
        },
        {
          url: "https://t.me/mhl_5",
          icon: <TelegramSvgIcon className="h-4 w-4 dark:fill-white" />,
          label: "telegram",
          id: "979d5c5c2a53e79732e0da4d672f6c8e2cf40592c83c04508e82",
        },
        {
          url: "https://discord.com/users/649998586154844160",
          icon: <DiscordLogoIcon className="scale-125 dark:fill-white" />,
          label: "discord",
          id: "0ef76e1177c9fa6eb71dfe9a5c9ef187a93900d5204ecb68a933",
        },
      ].map(({ url, icon, label, id }) => (
        <Button
          variant="outline"
          size="sm"
          className="custom-hover || rounded-lg px-6 py-4 transition-all duration-300"
          asChild
          key={id}
        >
          <Link
            href={url}
            target="_blank"
            className="flex min-h-10 items-center justify-between gap-2 sm:w-36"
          >
            <span className="hidden sm:inline">{label}</span>
            <span>{icon}</span>
          </Link>
        </Button>
      ))}
    </ul>
  );
}

export function TelegramSvgIcon({ className, ...props }: SvgIconsProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      fill="#252941"
      className={`${cn("h-6 w-6", className)}`}
      {...props}
    >
      <path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z" />
    </svg>
  );
}
