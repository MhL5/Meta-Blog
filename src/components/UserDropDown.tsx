import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/auth";
import {
  LogOut,
  NotebookPen,
  Settings
} from "lucide-react";
import { User } from "next-auth";
import Link from "next/link";
import FormSubmitButton from "./FormSubmitButton";
import UserAvatar from "./UserAvatar";

type UserDropDownProps = {
  user: User;
};

const dropDownMenuLi = [
  {
    to: "/dashboard",
    icon: <Settings className="h-5 w-5" />,
    name: "dashboard",
  },
  {
    to: "/write-article",
    icon: <NotebookPen className="h-5 w-5" />,
    name: "Write article",
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

          {dropDownMenuLi.map(({ to, icon, name }) => {
            return (
              <DropdownMenuItem key={to + icon + name}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start"
                  asChild
                >
                  <Link href={to} className="w-full space-x-4">
                    <span>{icon}</span>
                    <span>{name}</span>
                  </Link>
                </Button>
              </DropdownMenuItem>
            );
          })}

          <DropdownMenuItem>
            <LogoutForm />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}

function LogoutForm() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
      className="w-full"
    >
      <FormSubmitButton
        variant="ghost"
        size="sm"
        type="submit"
        className="w-full justify-start"
        pendingLabel={
          <div className="flex w-full items-center justify-start gap-3">
            <span>Login out...</span>
          </div>
        }
      >
        <div className="flex w-full items-center space-x-4">
          <span>
            <LogOut className="h-5 w-5" />
          </span>
          <span>Logout</span>
        </div>
      </FormSubmitButton>
    </form>
  );
}
