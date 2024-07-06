import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "@/components/Logo";
import Search from "@/components/Search";
import UserDropDown from "@/components/UserDropDown";
import Link from "next/link";
import { auth } from "@/lib/auth";
import ToggleTheme from "./ToggleTheme";
import { EllipsisVertical } from "lucide-react";

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/50 backdrop-blur-md">
      <NavigationMenu />
    </header>
  );
}

async function NavigationMenu() {
  const session = await auth();
  const user = session?.user;

  return (
    <nav className="m-auto p-2 sm:p-4 max-w-7xl">
      <ul className="flex items-center justify-between text-sm">
        <li className="flex items-center justify-center gap-10">
          <div className="sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Button asChild variant="ghost" size="xs">
                    <Link href="/authors">Authors</Link>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button asChild variant="ghost" size="xs">
                    <Link href="/articles">Articles</Link>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button asChild variant="ghost" size="xs">
                    <Link href="/topics">Topics</Link>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button variant="outline" size="xs" className="w-full">
                    Login
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button asChild size="xs">
                    <Link href="/auth?tab=signup">
                      <span>Create free account</span>
                    </Link>
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="opacity-0 sm:opacity-100">
            <Logo />
          </div>
          <Link className="hidden sm:inline" href="/authors">
            Authors
          </Link>
          <Link className="hidden sm:inline" href="/articles">
            Articles
          </Link>
          <Link href="/topics">Topics</Link>
        </li>

        <li className="sm:opacity-0">
          <Logo />
        </li>

        <li className="flex items-center justify-center gap-4">
          <Search />
          <ToggleTheme />

          <Avatar className="hidden" />
          {user ? (
            <UserDropDown />
          ) : (
            <>
              <Button
                variant="outline"
                size="xs"
                className="hidden sm:flex"
                asChild
              >
                <Link href="/auth?tab=login">Login</Link>
              </Button>
              <Button asChild size="xs" className="hidden sm:flex">
                <Link href="/auth?tab=signup">
                  <span className="hidden md:inline">Create free account</span>
                  <span className="md:hidden">Sign up</span>
                </Link>
              </Button>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Header;
