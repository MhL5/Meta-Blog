import { ReactElement } from "react";
import GithubSvg from "./svg/GithubSvg";
import TelegramSvg from "./svg/TelegramSvg";
import DiscordSvg from "./svg/DiscordSvg";

const FooterIconStyles = {
  li: `custom-gradient-bg-on-hover custom-hover || m-auto flex  h-10 w-10 cursor-pointer items-center justify-center  rounded-full bg-gray-700 transition duration-300`,
};

function FooterIcon(): ReactElement {
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

export default FooterIcon;
