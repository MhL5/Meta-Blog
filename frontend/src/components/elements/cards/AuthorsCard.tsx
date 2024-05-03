import { type ReactElement } from "react";

import Img from "../image/Img";
import { AuthorsType } from "../../../services/getAuthors";

function AuthorsCard({
  avatar,
  bio,
  likes,
  name,
  views,
  postsCount,
}: AuthorsType): ReactElement {
  return (
    <div className="custom-hover || w-80  cursor-pointer rounded-xl border border-borderColor bg-cardBackgroundColor p-4 text-center">
      <div className="mx-auto mb-6 mt-2 w-32 rounded-full">
        <Img className="h-full w-full rounded-full" src={avatar} />
      </div>
      <div className="text-2xl font-bold">{name}</div>
      <p className="my-4 px-4 text-center">
        {bio} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error,
        et.
      </p>
      <div className="space-x-4">
        <span>{views}👁️</span>
        <span>{likes}💖</span>
        <span>{postsCount}💬</span>
      </div>
    </div>
  );
}

export default AuthorsCard;
