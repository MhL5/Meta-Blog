import Logo from "@/components/Logo";
import Search from "@/components/Search";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserDropDown from "@/components/UserDropDown";
import { cachedAuth } from "@/lib/auth";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import ToggleTheme from "../ToggleTheme";
import GradientUnderlineText from "../ui/GradientUnderlineText";

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/50 backdrop-blur-md">
      <NavigationMenu />
    </header>
  );
}

const navigationLinks = [
  {
    id: "a0b26ca6cafa1b93517d73df60cd409820b85c23093dccec4f8f",
    href: "/authors",
    label: "Authors",
  },
  {
    id: "21564eb6f9dcb34a0c0382b0dd8e6eec6cd2b758abd4d61a2d31",
    href: "/topics",
    label: "Topics",
  },
];

async function NavigationMenu() {
  const session = await cachedAuth();
  const user = session?.user;

  return (
    <nav className="m-auto max-w-7xl px-2 py-3 sm:p-4">
      <ul className="flex items-center justify-between text-sm">
        <li className="flex items-center justify-center gap-4 sm:gap-10">
          <div className="sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical />
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                {navigationLinks.map(({ href, label, id }) => {
                  return (
                    <DropdownMenuItem key={id}>
                      <Button asChild variant="ghost" size="xs">
                        <Link href={href} className="w-full">
                          <GradientUnderlineText>{label}</GradientUnderlineText>
                        </Link>
                      </Button>
                    </DropdownMenuItem>
                  );
                })}

                <DropdownMenuItem className="grid w-full place-items-center text-xs">
                  <ToggleTheme>
                    <GradientUnderlineText className="pr-2">
                      theme
                    </GradientUnderlineText>
                  </ToggleTheme>
                </DropdownMenuItem>

                {!user && (
                  <>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                      <HeaderLoginButton className="w-full" />
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                      <HeaderSignUpButton />
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="hidden sm:block">
            <Logo />
          </div>

          {navigationLinks.map(({ href, label, id }) => {
            return (
              <Link
                href={href}
                key={id}
                className="mx-1 hidden font-semibold sm:flex"
              >
                <GradientUnderlineText className="z-50">
                  {label}
                </GradientUnderlineText>
              </Link>
            );
          })}
        </li>

        <li className="mx-auto sm:hidden">
          <Logo />
        </li>

        <li className="flex items-center justify-center gap-4">
          <span className="hidden sm:inline">
            <Search />
          </span>
          <span className="hidden sm:inline">
            <ToggleTheme />
          </span>

          {user ? (
            <UserDropDown user={user} />
          ) : (
            <>
              <HeaderLoginButton />
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
