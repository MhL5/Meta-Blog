import ToggleTheme from "./ToggleTheme";
import Logo from "./Logo";
import Search from "./Search";
import HamburgerMenu from "./HamburgerMenu";
import UserSvg from "./UserSvg";
import Button from "./Button";
import { NavLink } from "react-router-dom";

function NavigationMenu(): JSX.Element {
  return (
    <nav className="m-auto w-auto max-w-globalWidthContent p-8">
      <ul className="flex max-w-globalWidthContent items-center justify-between gap-8 text-sm">
        <li>
          <NavLink to="/">
            <Logo />
          </NavLink>
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
