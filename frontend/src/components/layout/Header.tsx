import { NavLink } from "react-router-dom";

import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Logo from "../ui/Logo";
import Search from "../ui/Search";
import ToggleTheme from "../../features/theme/ToggleTheme";
import { EllipsesVerticalSvgIcon } from "../SvgIcons";

type NavigationMenuProps = {
  className?: string;
};

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/60 backdrop-blur-md">
      <NavigationMenu />
    </header>
  );
}

function NavigationMenu({ className }: NavigationMenuProps) {
  return (
    <nav className={`${className} m-auto p-4 py-4`}>
      <ul className="flex items-center justify-between gap-8 text-sm font-bold">
        <li className="flex gap-10 items-center justify-center">
          <div className="sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsesVerticalSvgIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Button asChild variant="ghost" size="sm">
                    <NavLink to="/authors">Authors</NavLink>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button asChild variant="ghost" size="sm">
                    <NavLink to="/posts">Posts</NavLink>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button asChild variant="ghost" size="sm">
                    <NavLink to="/topics">Topics</NavLink>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button variant="outline" size="sm" className="w-full">
                    Login
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button asChild size="sm">
                    <NavLink to="/signup">
                      <span>Create free account</span>
                    </NavLink>
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Logo />
          <NavLink className="hidden sm:inline" to="/authors">
            Authors
          </NavLink>
          <NavLink className="hidden sm:inline" to="/posts">
            Posts
          </NavLink>
          <NavLink className="hidden sm:inline" to="/topics">
            Topics
          </NavLink>
        </li>

        <li className="m-auto sm:hidden">
          <Logo />
        </li>

        <li className="flex gap-4 items-center justify-center">
          <Search />
          <ToggleTheme />

          <Avatar className="hidden" />
          <Button variant="outline" size="sm" className="hidden sm:flex">
            Login
          </Button>
          <Button asChild size="sm" className="hidden sm:flex">
            <NavLink to="/signup">
              <span className="hidden md:inline">Create free account</span>
              <span className="md:hidden">Sign up</span>
            </NavLink>
          </Button>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
