import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

type UserAvatarProps = {
  url: string;
  fallBackText: string;
  className?: string;
};

export default function UserAvatar({
  className,
  url,
  fallBackText,
}: UserAvatarProps) {
  return (
    <Avatar className={`${className}`}>
      <AvatarImage src={`${import.meta.env.VITE_BACKEND_URL}/${url}`} />
      <AvatarFallback>{fallBackText}</AvatarFallback>
    </Avatar>
  );
}
