import { type ReactElement } from "react";
import NavigationMenu from "./NavigationMenu";

function Header(): ReactElement {
  return (
    <header className="sticky top-0 z-50 bg-bodyBackgroundColor/70 backdrop-blur-md">
      <NavigationMenu />
    </header>
  );
}

export default Header;
