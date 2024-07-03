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
import { auth, signOut } from "@/lib/auth";

export default async function UserDropDown() {
  const session = await auth();
  const user = session?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar className="cursor-pointer" imageSrc={user?.image || ""} />
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

          {[
            { to: "/dashboard", icon: <GearIcon />, name: "dashboard" },
            { to: "#", icon: <EnvelopeOpenIcon />, name: "Send feedback" },
            { to: "#", icon: <QuestionMarkCircledIcon />, name: "FAQ" },
          ].map(({ to, icon, name }) => {
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
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button
                variant="ghost"
                size="sm"
                type="submit"
                className="justify-start"
              >
                <div className="w-full space-x-4 flex items-center">
                  <span>
                    <ExitIcon />
                  </span>
                  <span>Logout</span>
                </div>
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
