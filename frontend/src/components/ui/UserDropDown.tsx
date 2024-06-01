import { NavLink } from "react-router-dom";
import { Auth } from "@/features/authentication/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./button";
import { useLogout } from "@/features/authentication/useLogout";
import {
  EnvelopeOpenIcon,
  ExitIcon,
  GearIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import UserAvatar from "./UserAvatar";

type UserProps = { auth: Auth };
export default function UserDropDown({ auth }: UserProps) {
  const { logout } = useLogout();

  function handleLogout() {
    logout();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          className="cursor-pointer"
          url={`${auth?.data.user?.avatar}`}
        />
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="px-4">
            <ul>
              <li className="capitalize">{auth.data.user.fullName}</li>
              <li className="text-xs opacity-70">{auth.data.user.email}</li>
            </ul>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          {[
            { to: "/dashboard", icon: <GearIcon />, name: "dashboard" },
            { to: "#", icon: <EnvelopeOpenIcon />, name: "Send feedback" },
            { to: "#", icon: <QuestionMarkCircledIcon />, name: "FAQ" },
            {
              to: "#",
              icon: <ExitIcon />,
              name: "logout",
              onClick: handleLogout,
            },
          ].map(({ to, icon, name, onClick }) => {
            return (
              <DropdownMenuItem key={to + icon + name}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start"
                  asChild
                  onClick={onClick ? onClick : undefined}
                >
                  <NavLink to={to} className="w-full space-x-4">
                    <span>{icon}</span>
                    <span>{name}</span>
                  </NavLink>
                </Button>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
