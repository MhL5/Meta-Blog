import { Link } from "react-router-dom";

import { DiscordSvgIcon, GithubSvgIcon, TelegramSvgIcon } from "../SvgIcons";
import { Button } from "../ui/button";
import Logo from "../ui/Logo";

type FooterProps = { className?: string };

function Footer({ className }: FooterProps) {
  return (
    <footer
      className={`${className} border-t-borderColor flex items-start justify-between gap-14 border-t bg-background/30 p-8 backdrop-blur-sm`}
    >
      <div className="flex flex-col items-start justify-center p-2 text-start text-sm sm:text-base">
        <h3>
          <Logo title="Meta Blog" className="text-xl font-semibold" />
        </h3>
        <p className="mt-4 text-sm font-semibold">
          inspired by{" "}
          <Link
            to="https://porto.gbjsolution.com/"
            className="text-blue-500 underline underline-offset-4"
            target="_blank"
          >
            Ghost theme
          </Link>
          . Developed by{" "}
          <Link
            to="https://github.com/MhL5"
            className="text-blue-500 underline underline-offset-4"
            target="_blank"
          >
            MhL
          </Link>
        </p>

        <Footer.Icons />
      </div>

      <div className="flex flex-col">
        <div className="mb-2 px-3 text-sm dark:text-white/60">About:</div>

        {[
          { path: "/", text: "Contact us" },
          { path: "/", text: "About us" },
        ].map(({ path, text }) => (
          <Button
            variant="ghost"
            asChild
            size="sm"
            className="self-start"
            key={text + path}
          >
            <Link to={path}>{text}</Link>
          </Button>
        ))}
      </div>
    </footer>
  );
}

function FooterIcons() {
  return (
    <ul className="mt-6 flex gap-4">
      {[
        {
          url: "https://github.com/MhL5",
          icon: <GithubSvgIcon className="scale-125 dark:fill-white" />,
        },
        {
          url: "https://t.me/mhl_5",
          icon: <TelegramSvgIcon className="scale-125 dark:fill-white" />,
        },
        {
          url: "https://discord.com/users/649998586154844160",
          icon: <DiscordSvgIcon className="scale-125 dark:fill-white" />,
        },
      ].map(({ url, icon }) => (
        <Button
          variant="outline"
          size="sm"
          className="rounded-full"
          asChild
          key={url}
        >
          <a href={url} target="_blank" className="block h-10 w-10">
            {icon}
          </a>
        </Button>
      ))}
    </ul>
  );
}

Footer.Icons = FooterIcons;
export default Footer;
