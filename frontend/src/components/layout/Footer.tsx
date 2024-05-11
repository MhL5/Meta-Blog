import Logo from "../elements/icons/Logo";
import GithubSvg from "../elements/icons/GithubSvg";
import TelegramSvg from "../elements/icons/TelegramSvg";
import DiscordSvg from "../elements/icons/DiscordSvg";
import { Link } from "react-router-dom";

type FooterProps = { className?: string };
function Footer({ className }: FooterProps) {
  return (
    <footer
      className={`${className} flex items-start justify-around gap-14 border-t border-t-borderColor p-8`}
    >
      <div className="flex flex-col items-start justify-center text-start">
        <h3>
          <Logo />
        </h3>
        <p className="mt-4">
          inspired by{" "}
          <a
            href="https://porto.gbjsolution.com/"
            className="text-blue-500"
            target="_blank"
          >
            Ghost theme.
          </a>{" "}
          Developed by{" "}
          <a
            href="https://github.com/MhL5"
            className="text-blue-500"
            target="_blank"
          >
            MhL
          </a>
        </p>

        <Footer.Icon />
      </div>

      <div className="flex flex-col">
        <div className="mb-2 text-sm dark:text-white/60">Pages:</div>

        <Link to="/Authors">Authors</Link>
        <Link to="/Posts">Posts</Link>
        <Link to="/signup">signup</Link>
        <Link to="/sa56d1s5a1d56as1d56as">404</Link>
        <Link to="/dashboard">user dashboard</Link>
      </div>
    </footer>
  );
}

const FooterIconStyles = {
  li: `custom-gradient-bg-on-hover custom-hover || m-auto flex  h-10 w-10 cursor-pointer items-center justify-center  rounded-full bg-gray-700 transition duration-300`,
};

function FooterIcon() {
  return (
    <ul className="mt-6 flex gap-4">
      <li className={`${FooterIconStyles.li}`}>
        <div className="w-5">
          <GithubSvg />
        </div>
      </li>

      <li className={`${FooterIconStyles.li}`}>
        <div className="w-5">
          <TelegramSvg />
        </div>
      </li>

      <li className={`${FooterIconStyles.li}`}>
        <div className="w-5">
          <DiscordSvg />
        </div>
      </li>
    </ul>
  );
}

Footer.Icon = FooterIcon;
export default Footer;
