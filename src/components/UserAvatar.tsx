import { PersonIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReactNode } from "react";

type UserAvatarProps = {
  imageSrc: string;
  fallBackText?: string | ReactNode;
  className?: string;
};

export default function UserAvatar({
  className,
  imageSrc,
  fallBackText = <PersonIcon />,
}: UserAvatarProps) {
  return (
    <Avatar className={`${className} outline outline-[0.1px]`}>
      <AvatarImage src={imageSrc} />
      <AvatarFallback>{fallBackText}</AvatarFallback>
    </Avatar>
  );
}
