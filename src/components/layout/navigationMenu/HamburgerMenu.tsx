import UserRoundPen from "@/components/icons/UserRoundPen";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import GradientUnderlineText from "@/components/ui/GradientUnderlineText";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { NotebookPen, Settings, Tags } from "lucide-react";
import { User } from "next-auth";
import Link from "next/link";
import {
  HeaderLoginButton,
  HeaderSignUpButton,
  LogoutButton,
} from "./NavigationButtons";

const userList = [
  {
    id: "587bc9bf1d6c687e116d0ac5c73a84d1602472b5fa003a9de100",
    href: "/dashboard",
    icon: <Settings className="h-5 w-5" />,
    label: "dashboard",
  },
  {
    id: "f22cbc32889e9fe1d308afab461702188cdfa2c29b7622f2a8cb",
    href: "/write-article",
    icon: <NotebookPen className="h-5 w-5" />,
    label: "Write article",
  },
];

const pageList = [
  {
    id: "205dbb4d5609085696db3743f1072a92d94a2e6c82eb25a6b1a4",
    href: "/authors",
    icon: <UserRoundPen className="h-5 w-5" />,
    label: "authors",
  },
  {
    id: "a6b2d28cc1ac19781b4228446cf9a7722d834cb1e6394e6fd589",
    href: "/categories",
    icon: <Tags className="h-5 w-5" />,
    label: "categories",
  },
];

export default function HamburgerMenu({ user }: { user: User | undefined }) {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost">
          <HamburgerMenuIcon className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle className="flex items-center text-lg">
            <Logo className="scale-75" />
            <span>Meta Blog</span>
          </SheetTitle>
        </SheetHeader>

        <ul className="mt-6 border-t py-4 font-bold capitalize">
          {pageList.map(({ id, href, icon, label }) => {
            return (
              <li className="w-full" key={id}>
                <Button asChild variant="ghost" className="justify-start">
                  <Link
                    href={href}
                    className="inline-block w-full space-x-4 px-1 py-6"
                  >
                    {icon}
                    <GradientUnderlineText>{label}</GradientUnderlineText>
                  </Link>
                </Button>
              </li>
            );
          })}
        </ul>

        <ul className="border-t pr-1 pt-3">
          {user ? (
            <>
              {userList.map(({ href, icon, label }) => {
                return (
                  <li key={href + icon + label}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="justify-start"
                      asChild
                    >
                      <Link href={href} className="w-full space-x-4 py-6">
                        <span>{icon}</span>
                        <span className="gradient-underline-animation ||">
                          {label}
                        </span>
                      </Link>
                    </Button>
                  </li>
                );
              })}
              <LogoutButton />
            </>
          ) : (
            <>
              <li className="my-4 w-full">
                <HeaderLoginButton className="w-full" />
              </li>
              <li className="my-4 w-full">
                <HeaderSignUpButton />
              </li>
            </>
          )}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
