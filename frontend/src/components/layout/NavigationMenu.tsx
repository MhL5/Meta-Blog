import ToggleTheme from "../../features/theme/ToggleTheme";
import Logo from "../elements/icons/Logo";
import Search from "../form/Search";
import HamburgerMenu from "../elements/hamburgerMenu/HamburgerMenu";
import UserSvg from "../elements/icons/UserSvg";
import Button from "../elements/button/Button";
import { NavLink } from "react-router-dom";
import { ReactElement } from "react";
import Login from "../../features/authentication/Login";
import LoginButton from "../../features/authentication/LoginButton";

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
          {/* TODO: compound component */}
          <LoginButton />
          <Login />
          {/* TODO: compound component */}
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
