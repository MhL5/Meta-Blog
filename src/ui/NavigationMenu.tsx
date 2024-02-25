import ToggleTheme from "./ToggleTheme";
import Logo from "./Logo";
import Search from "./Search";
import HamburgerMenu from "./HamburgerMenu";
import UserSvg from "./UserSvg";
import Button from "./Button";

function NavigationMenu(): JSX.Element {
  return (
    <nav className="m-auto w-auto max-w-globalWidthContent p-8">
      <ul className="flex max-w-globalWidthContent items-center justify-between gap-8 text-sm">
        <li>
          <Logo />
        </li>

        <li className="hidden lg:ml-3 lg:block">Authors</li>
        <li className="hidden lg:block">Posts</li>
        <li className="hidden lg:block">Topics</li>

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
          <Button variant="transparent">Sign in</Button>
        </li>
        <li className="hidden lg:block">
          <Button variant="primary">Become a member</Button>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationMenu;
