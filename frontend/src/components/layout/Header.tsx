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
import { EllipsesVerticalSvgIcon } from "../SvgIcons";
import { useAuthContext } from "@/features/authentication/AuthContext";
import Logo from "../ui/Logo";
import Search from "../ui/Search";
import ToggleTheme from "../../features/theme/ToggleTheme";
import UserDropDown from "../ui/UserDropDown";

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/50 backdrop-blur-md">
      <NavigationMenu />
    </header>
  );
}

function NavigationMenu() {
  const { auth } = useAuthContext();

  return (
    <nav className="m-auto p-2 sm:p-4">
      <ul className="flex items-center justify-between text-sm font-bold">
        <li className="flex items-center justify-center gap-10">
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
                    <NavLink to="/articles">Articles</NavLink>
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
                    <NavLink to="/signup?tab=signup">
                      <span>Create free account</span>
                    </NavLink>
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="opacity-0 sm:opacity-100">
            <Logo />
          </div>
          <NavLink className="hidden sm:inline" to="/authors">
            Authors
          </NavLink>
          <NavLink className="hidden sm:inline" to="/articles">
            Articles
          </NavLink>
          <NavLink className="hidden sm:inline" to="/topics">
            Topics
          </NavLink>
        </li>

        <li className="sm:opacity-0">
          <Logo />
        </li>

        <li className="flex items-center justify-center gap-4">
          <Search />
          <ToggleTheme />

          <Avatar className="hidden" />
          {auth ? (
            <UserDropDown auth={auth} />
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex"
                asChild
              >
                <NavLink to="/signup?tab=login">Login</NavLink>
              </Button>
              <Button asChild size="sm" className="hidden sm:flex">
                <NavLink to="/signup?tab=signup">
                  <span className="hidden md:inline">Create free account</span>
                  <span className="md:hidden">Sign up</span>
                </NavLink>
              </Button>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Header;
