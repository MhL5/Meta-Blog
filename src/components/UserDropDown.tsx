import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  EnvelopeOpenIcon,
  ExitIcon,
  GearIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { signOut } from "@/lib/auth";
import { User } from "next-auth";
import FormSubmitButton from "./FormSubmitButton";
import Spinner from "./Spinner";

type UserDropDownProps = {
  user: User;
};

const dropDownMenuLi = [
  { to: "/dashboard", icon: <GearIcon />, name: "dashboard" },
  { to: "#", icon: <EnvelopeOpenIcon />, name: "Send feedback" },
  { to: "#", icon: <QuestionMarkCircledIcon />, name: "FAQ" },
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
        className="justify-start w-full"
        pendingLabel={
          <div className="w-full flex items-center gap-3 justify-start">
            <span>
              <Spinner size="sm" />
            </span>
            <span>Login out...</span>
          </div>
        }
      >
        <div className="w-full space-x-4 flex items-center">
          <span>
            <ExitIcon />
          </span>
          <span>Logout</span>
        </div>
      </FormSubmitButton>
    </form>
  );
}
