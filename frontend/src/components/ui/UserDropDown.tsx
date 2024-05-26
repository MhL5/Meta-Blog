import { NavLink } from "react-router-dom";
import { Auth } from "@/features/authentication/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./button";
import { useLogout } from "@/features/authentication/useLogout";

type UserProps = { auth: Auth };
export default function UserDropDown({ auth }: UserProps) {
  const { logout } = useLogout();

  function handleLogout() {
    logout();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={`http://localhost:3000/${auth?.data.user?.avatar}`}
          />
          <AvatarFallback>{auth?.data.user.fullName}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem className="px-4">
          <ul>
            <li className="capitalize">{auth.data.user.fullName}</li>
            <li className="text-xs opacity-70">{auth.data.user.email}</li>
          </ul>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Button
            variant="ghost"
            size="sm"
            className="hidden justify-start sm:flex"
            asChild
          >
            {/* todo */}
            <NavLink to="#" className="w-full">
              dashboard
            </NavLink>
          </Button>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Button
            variant="ghost"
            size="sm"
            className="hidden justify-start sm:flex"
            asChild
          >
            {/* todo */}
            <NavLink to="#" className="w-full">
              Send feedback
            </NavLink>
          </Button>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Button
            variant="ghost"
            size="sm"
            className="hidden justify-start sm:flex"
            onClick={handleLogout}
          >
            logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
