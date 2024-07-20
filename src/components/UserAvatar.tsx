import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserAvatarProps = {
  imageSrc: string;
  username: string;
  className?: string;
};

/**
 * a component that renders a user profile or avatar
 * sometimes google images does not show up which we can fix by adding `referrerPolicy="no-referrer"` to image
 */
export default function UserAvatar({
  className,
  imageSrc,
  username,
}: UserAvatarProps) {
  return (
    <Avatar className={`${className} outline outline-[0.1px] outline-primary`}>
      <AvatarImage
        src={imageSrc}
        referrerPolicy="no-referrer"
        alt="logged in user profile picture"
      />
      <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
