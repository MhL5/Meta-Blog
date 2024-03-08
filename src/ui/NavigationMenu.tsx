import ToggleTheme from "./ToggleTheme";
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

const liStyles = `custom-hover-with-border || hover:-translate-y-[1px] hover:border-x-transparent hover:border-t-transparent `;

function NavigationMenu({ className }: NavigationMenuProps): ReactElement {
  return (
    <nav className={`${className} m-auto max-w-globalWidthContent p-8 py-4`}>
      <ul className="flex max-w-globalWidthContent items-center justify-between gap-8 text-sm font-bold">
        <li className={`duration-300 hover:-translate-y-[2px]`}>
          <Logo />
        </li>

        <li className={`${liStyles} || hidden lg:ml-3 lg:block`}>
          <NavLink to="/authors">Authors</NavLink>
        </li>

        <li className={`${liStyles} || hidden lg:block`}>
          <NavLink to="/posts">Posts</NavLink>
        </li>

        <li className={`${liStyles} || hidden lg:block`}>
          <NavLink to="/topics"> Topics</NavLink>
        </li>

        <li className={`${liStyles} || ml-auto cursor-pointer`}>
          <Search />
        </li>

        <li className={`${liStyles} || hidden sm:block`}>
          <ToggleTheme />
        </li>

        <li className={`${liStyles} || lg:hidden`}>
          <UserSvg />
        </li>

        <li className={`${liStyles} || block cursor-pointer lg:hidden`}>
          <HamburgerMenu />
        </li>

        <li className={`hidden lg:block`}>
          <Button
            variant="transparent"
            to="/login"
            el="anchor"
            className="mr-2 inline-block duration-300 hover:translate-y-[-4px]"
          >
            Login
          </Button>
          <Button
            variant="primary"
            to="/signup"
            el="anchor"
            className="inline-block duration-300 hover:translate-y-[-4px]"
          >
            Sign up
          </Button>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationMenu;
