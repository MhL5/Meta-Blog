import { PersonIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { ReactNode } from "react";

type UserAvatarProps = {
  url: string;
  fallBackText?: string | ReactNode;
  className?: string;
};

export default function UserAvatar({
  className,
  url,
  fallBackText = <PersonIcon />,
}: UserAvatarProps) {
  return (
    <Avatar className={`${className} outline outline-[0.1px]`}>
      <AvatarImage src={`${import.meta.env.VITE_BACKEND_URL}/${url}`} />
      <AvatarFallback>{fallBackText}</AvatarFallback>
    </Avatar>
  );
}
