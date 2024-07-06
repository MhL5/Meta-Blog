import { Avatar } from "@/components/ui/avatar";
import { Button, ButtonProps } from "@/components/ui/button";
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
import { cachedAuth } from "@/lib/auth";
import ToggleTheme from "../ToggleTheme";
import { EllipsisVertical } from "lucide-react";
import { UUIDGenerator } from "@/lib/utils";

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/50 backdrop-blur-md">
      <NavigationMenu />
    </header>
  );
}

const dropDownMenuItems = [
  {
    id: UUIDGenerator(),
    href: "/authors",
    label: "Authors",
  },
  {
    id: UUIDGenerator(),
    href: "/articles",
    label: "Articles",
  },
  {
    id: UUIDGenerator(),
    href: "/topics",
    label: "Topics",
  },
];

async function NavigationMenu() {
  const session = await cachedAuth();
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
                {dropDownMenuItems.map(({ href, label, id }) => {
                  return (
                    <DropdownMenuItem key={id}>
                      <Button asChild variant="ghost" size="xs">
                        <Link href={href}>{label}</Link>
                      </Button>
                    </DropdownMenuItem>
                  );
                })}

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <HeaderLoginButton className="w-full" />
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <HeaderSignUpButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="opacity-0 sm:opacity-100">
            <Logo />
          </div>

          {dropDownMenuItems.map(({ href, label, id }) => {
            return (
              <Button
                asChild
                variant="ghost"
                size="sm"
                key={id}
                className="hidden sm:flex"
              >
                <Link href={href}>{label}</Link>
              </Button>
            );
          })}
        </li>

        <li className="sm:opacity-0">
          <Logo />
        </li>

        <li className="flex items-center justify-center gap-4">
          <Search />
          <ToggleTheme />

          <Avatar className="hidden" />
          {user ? (
            <UserDropDown user={user} />
          ) : (
            <>
              <HeaderLoginButton className="hidden sm:flex" />
              <HeaderSignUpButton className="hidden sm:flex" />
            </>
          )}
        </li>
      </ul>
    </nav>
  );
}

function HeaderSignUpButton({
  className,
  ...props
}: { className?: string } & ButtonProps) {
  return (
    <Button asChild size="xs" className={`${className} w-full`} {...props}>
      <Link href="/auth?tab=signup">
        <span className="hidden md:inline">Create free account</span>
        <span className="md:hidden">Sign up</span>
      </Link>
    </Button>
  );
}

function HeaderLoginButton({
  className,
  ...props
}: { className?: string } & ButtonProps) {
  return (
    <Button
      variant="outline"
      size="xs"
      className={`${className} `}
      asChild
      {...props}
    >
      <Link href="/auth?tab=login">Login</Link>
    </Button>
  );
}

export default Header;
