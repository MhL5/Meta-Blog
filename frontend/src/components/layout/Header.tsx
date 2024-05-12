import { NavLink } from "react-router-dom";
import Logo from "../ui/Logo";
import Search from "../ui/Search";
import ToggleTheme from "../ui/ToggleTheme";
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

const liStyles = `custom-hover-with-border || hover:-translate-y-[1px] hover:border-x-transparent hover:border-t-transparent `;

function NavigationMenu({ className }: NavigationMenuProps) {
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
          <Avatar />
        </li>

        <li className={`${liStyles} || block cursor-pointer lg:hidden`}>
          <HamburgerMenu />
        </li>

        <li className={`hidden lg:block`}>
          <Button>Login</Button>
          <NavLink
            to="/signup"
            className="inline-block duration-300 hover:translate-y-[-4px]"
          >
            Sign up
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

Header.NavigationMenu = NavigationMenu;
export default Header;
