import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { memo, useMemo } from "react";

type UserAvatarProps = {
  imageSrc: string;
  username: string;
  className?: string;
};

/**
 * a component that renders a user profile or avatar
 * sometimes google images does not show up which we can fix by adding `referrerPolicy="no-referrer"` to image
 */
const UserAvatar = memo(
  ({ className, imageSrc, username }: UserAvatarProps) => {
    const randomBg = useMemo(() => randomBgColor(username), [username]);

    return (
      <Avatar
        className={`${className} outline outline-[0.1px] outline-primary`}
      >
        <AvatarImage
          src={imageSrc}
          referrerPolicy="no-referrer"
          alt="logged in user profile picture"
        />
        <AvatarFallback className={`${randomBg}`}>
          {username.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    );
  },
);

UserAvatar.displayName = `UserAvatar`;

function randomBgColor(username: string) {
  const randomBgColor = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-yellow-500",
    "bg-red-600",
    "bg-slate-500",
    "bg-green-500",
    "bg-pink-500",
    "bg-orange-500",
    "bg-teal-500",
    "bg-indigo-500",
    "bg-rose-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-lime-500",
    "bg-violet-500",
    "bg-fuchsia-500",
  ];

  // const randomIndex = Math.floor(Math.random() * randomBgColor.length);
  // return randomBgColor[randomIndex];
  const firstLetter = username.charAt(0).toLowerCase();
  const index = (firstLetter.charCodeAt(0) - 97) % randomBgColor.length;
  return randomBgColor[index];
}

export default UserAvatar;
