import { ReactElement } from "react";
import Logo from "./Logo";
import FooterIcon from "./FooterIcon";

function Footer(): ReactElement {
  return (
    <footer className="flex items-start justify-around gap-14 border-t border-t-white/20 p-8">
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
            MhL5
          </a>
        </p>

        <FooterIcon />
      </div>

      <div>
        <div className="mb-2 text-sm text-white/60">Pages:</div>

        <div>Authors</div>
        <div>Posts</div>
        <div>login</div>
        <div>404</div>
        <div>user dashboard</div>
      </div>
    </footer>
  );
}

export default Footer;
