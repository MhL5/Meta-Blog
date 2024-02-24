import ToggleTheme from "./ToggleTheme";
import Logo from "./Logo";
import Search from "./Search";
import HamburgerMenu from "./HamburgerMenu";
import UserSvg from "./UserSvg";
import Button from "./Button";

function NavigationMenu(): JSX.Element {
  return (
    <nav className="p-8">
      <ul className="flex items-center justify-between gap-8">
        <li>
          <Logo />
        </li>

        <li className="hidden lg:block">Authors</li>
        <li className="hidden lg:block">Posts</li>
        <li className="hidden lg:block">Topics</li>

        <li className="ml-auto">
          <Search />
        </li>

        <li>
          <ToggleTheme />
        </li>

        <li className="lg:hidden">
          <UserSvg />
        </li>

        <li className="block h-8 w-6 cursor-pointer lg:hidden">
          <HamburgerMenu />
        </li>

        <li className="hidden lg:block">
          <Button type="transparent">Sign in</Button>
        </li>
        <li className="hidden lg:block">
          <Button type="primary">Become a member</Button>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationMenu;
