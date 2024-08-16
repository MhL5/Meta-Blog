import UserAvatar from "@/components/UserAvatar";
import { LogoutButton } from "@/components/layout/navigationMenu/NavigationButtons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NotebookPen, Settings } from "lucide-react";
import { User } from "next-auth";
import Link from "next/link";

type UserDropDownProps = {
  user: User;
};

const dropDownMenuLi = [
  {
    href: "/dashboard",
    icon: <Settings className="h-5 w-5" />,
    label: "dashboard",
  },
  {
    href: "/write-article",
    icon: <NotebookPen className="h-5 w-5" />,
    label: "Write article",
  },
];

export default async function UserDropDown({ user }: UserDropDownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          className="cursor-pointer"
          username={user.name || ""}
          imageSrc={user?.image || ""}
        />
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="px-4">
            <ul>
              <li className="capitalize">{user?.name}</li>
              <li className="text-xs opacity-70">{user?.email}</li>
            </ul>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {dropDownMenuLi.map(({ href, icon, label }) => {
            return (
              <DropdownMenuItem key={href + icon + label}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start"
                  asChild
                >
                  <Link href={href} className="w-full space-x-4">
                    <span>{icon}</span>
                    <span>{label}</span>
                  </Link>
                </Button>
              </DropdownMenuItem>
            );
          })}

          <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
