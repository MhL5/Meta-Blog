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
      <Avatar className={`${className} text-slate-800 dark:text-slate-300`}>
        <AvatarImage
          src={imageSrc}
          loading="lazy"
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
    "bg-blue-600",
    "bg-purple-600",
    "bg-red-600",
    "bg-slate-600",
    "bg-green-600",
    "bg-yellow-600",
    "bg-pink-600",
    "bg-orange-600",
    "bg-teal-600",
    "bg-indigo-600",
    "bg-rose-600",
    "bg-emerald-600",
    "bg-amber-600",
    "bg-lime-600",
    "bg-violet-600",
    "bg-fuchsia-600",
  ];

  // const randomIndex = Math.floor(Math.random() * randomBgColor.length);
  // return randomBgColor[randomIndex];
  const firstLetter = username.charAt(0).toLowerCase();
  const index = (firstLetter.charCodeAt(0) - 97) % randomBgColor.length;
  return randomBgColor[index];
}

export default UserAvatar;
