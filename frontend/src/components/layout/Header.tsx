import { NavLink } from "react-router-dom";

import Logo from "../ui/Logo";
import Search from "../ui/Search";
import ToggleTheme from "../../features/theme/ToggleTheme";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import HamburgerMenu from "../ui/HamburgerMenu";

type NavigationMenuProps = {
  className?: string;
};

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-bodyBackgroundColor/70 backdrop-blur-md">
      <NavigationMenu />
    </header>
  );
}

function NavigationMenu({ className }: NavigationMenuProps) {
  return (
    <nav className={`${className} m-auto p-8 py-4`}>
      <ul className="flex items-center justify-between gap-8 text-sm font-bold">
        <li className="flex gap-10 items-center justify-center">
          <HamburgerMenu className="hidden" />
          <Logo />
          <NavLink to="/authors">Authors</NavLink>
          <NavLink to="/posts">Posts</NavLink>
          <NavLink to="/topics"> Topics</NavLink>
        </li>

        <li className="flex gap-4 items-center justify-center">
          <Search />
          <ToggleTheme />

          <Avatar className="hidden" />
          <Button variant="outline">Login</Button>
          <Button asChild>
            <NavLink to="/signup">Create free account</NavLink>
          </Button>
        </li>
      </ul>
    </nav>
  );
}

Header.NavigationMenu = NavigationMenu;
export default Header;
