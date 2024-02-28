import ToggleTheme from "../features/theme/ToggleTheme";
import Logo from "./Logo";
import Search from "./Search";
import HamburgerMenu from "./HamburgerMenu";
import UserSvg from "./UserSvg";
import Button from "./Button";
import { NavLink } from "react-router-dom";
import { ReactElement } from "react";

type NavigationMenuProps = {
  className?: string;
};

function NavigationMenu({ className }: NavigationMenuProps): ReactElement {
  return (
    <nav className={`${className} m-auto max-w-globalWidthContent p-8 py-4`}>
      <ul className="flex max-w-globalWidthContent items-center justify-between gap-8 text-sm">
        <li>
          <Logo />
        </li>

        <li className="hidden lg:ml-3 lg:block">
          <NavLink to="/authors">Authors</NavLink>
        </li>

        <li className="hidden lg:block">
          <NavLink to="/posts">Posts</NavLink>
        </li>

        <li className="hidden lg:block">
          <NavLink to="/topics"> Topics</NavLink>
        </li>

        <li className="ml-auto">
          <Search />
        </li>

        <li className="hidden sm:block">
          <ToggleTheme />
        </li>

        <li className="lg:hidden">
          <UserSvg />
        </li>

        <li className="block cursor-pointer lg:hidden">
          <HamburgerMenu />
        </li>

        <li className="hidden lg:block">
          <Button variant="transparent" to="/login" el="anchor">
            Sign in
          </Button>
        </li>
        <li className="hidden lg:block">
          <Button variant="primary" to="/login" el="anchor">
            Become a member
          </Button>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationMenu;
