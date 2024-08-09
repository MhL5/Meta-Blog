import ArticleSearch from "@/components/ArticleSearch";
import Logo from "@/components/Logo";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import UserDropDown from "@/components/UserDropDown";
import { cachedAuth } from "@/lib/auth";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import ToggleTheme from "../ToggleTheme";
import GradientUnderlineText from "../ui/GradientUnderlineText";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/50 backdrop-blur-md">
      <NavigationMenuWrapper />
    </header>
  );
}

async function NavigationMenuWrapper() {
  const session = await cachedAuth();
  const user = session?.user;

  const navigationLinks = [
    {
      id: "a0b26ca6cafa1b93517d73df60cd409820b85c23093dccec4f8f",
      href: "/authors",
      label: "Authors",
    },
  ];

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
          <SubMenu />
        </li>

        <li className="mx-auto sm:hidden">
          <Logo />
        </li>

        <li className="flex items-center justify-center gap-4">
          <span className="hidden sm:inline">
            <ArticleSearch />
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

function SubMenu() {
  const categories = [
    {
      id: "42749a8c793e912a0014ea8c15b93549c6d24b56bbbb1aaf9cc0",
      category: `web_development`,
    },
    {
      id: "425407a35c29ec3244dd8d9192272a756207382380d457a1c627",
      category: `devOps`,
    },
    {
      id: "282702bec15fe902996a7918cb97ce4568aa46eebd5664f23d0e",
      category: `machine_learning`,
    },
    {
      id: "786e35ca4be0d9ab087945b628ab5436d0471d886c57c70ecf36",
      category: `data_science`,
    },
    {
      id: "e76335cf0b93825966e4d834723664785ac6132d0c6440861d05",
      category: `cyber_security`,
    },
    {
      id: "8c21456154afa7930ce7cb0aa32588dfad3d2161fdf87f93ad66",
      category: `ui_ux`,
    },
    {
      id: "f87bd2fab02911b2411c8357972ae678d035961bffadd9dcf889",
      category: `mobile_development`,
    },
    {
      id: "9f2a8d7d88de67c7bd9b10b11a03152031cdaa6119356f9ac301",
      category: `game_development`,
    },
    {
      id: "d560e47f4c36bbe53519fa8b2d56a5f27ace223fbafd85a46eee",
      category: `artificial_intelligence`,
    },
    {
      id: "d2d36148a861caef0e996548829c48da8781456c1f2b0a1274ec",
      category: `database_management`,
    },
    {
      id: "318c0592a84d320bc5f84b1acf2ba87797c851eaaa3952457dea",
      category: `version_control`,
    },
    {
      id: "838c45d09698ff1c749c6e9831b5f2f08dc8a7e3d7c8f638ea41",
      category: `testing_and_qa`,
    },
    {
      id: "3404248ae4b5b618de621db1670422b867cdf3afa01776c0d831",
      category: `algorithms`,
    },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <GradientUnderlineText>
            <NavigationMenuTrigger className="bg-transparent">
              <Link href="/categories">Categories</Link>
            </NavigationMenuTrigger>
          </GradientUnderlineText>
          <NavigationMenuContent>
            <ul className="h-96 divide-y-2 overflow-y-scroll">
              {categories.map(({ category, id }) => {
                return (
                  <li key={id} className="w-full">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start rounded-none"
                      asChild
                    >
                      <Link
                        href={`/categories?category=${category}`}
                        className="text-start capitalize"
                      >
                        <GradientUnderlineText>
                          {category.replaceAll("_", " ")}
                        </GradientUnderlineText>
                      </Link>
                    </Button>
                  </li>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
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
