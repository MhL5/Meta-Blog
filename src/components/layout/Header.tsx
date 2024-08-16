import { cachedAuth } from "@/lib/auth";
import Logo from "../Logo";
import Link from "next/link";
import GradientUnderlineText from "../ui/GradientUnderlineText";
import CategoriesSubMenu from "./navigationMenu/CategoriesSubMenu";
import ArticleSearch from "../ArticleSearch";
import ToggleTheme from "../ToggleTheme";
import UserDropDown from "./navigationMenu/UserDropDown";
import {
  HeaderLoginButton,
  HeaderSignUpButton,
} from "./navigationMenu/NavigationButtons";
import HamburgerMenu from "./navigationMenu/HamburgerMenu";

export default async function Header() {
  const session = await cachedAuth();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 border-b bg-background/50 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between p-2">
        <ul className="flex items-center gap-6 capitalize">
          <Logo className="h-6 w-6" />

          <li className="hidden list-none text-sm font-semibold md:block">
            <Link href="/authors" className="inline-block w-full space-x-2">
              <GradientUnderlineText>authors</GradientUnderlineText>
            </Link>
          </li>

          <li className="hidden list-none md:block">
            <CategoriesSubMenu />
          </li>
        </ul>

        <div className="flex items-center gap-1">
          <ArticleSearch />
          <ToggleTheme />

          <li className="hidden gap-2 md:flex">
            {user ? (
              <UserDropDown user={user} />
            ) : (
              <>
                <HeaderLoginButton />
                <HeaderSignUpButton className="hidden sm:flex" />
              </>
            )}
          </li>
          <HamburgerMenu user={user} />
        </div>
      </nav>
    </header>
  );
}
