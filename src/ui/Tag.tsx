import { ReactElement } from "react";

const tagsStyle = `custom-tag-shadow-on-hover || w-60 text-start relative flex cursor-pointer items-center justify-center gap-4  rounded-full border border-borderColor bg-cardBackgroundColor p-4  `;

function Tag({ tag, imgUrl }: { tag: string; imgUrl: string }): ReactElement {
  return (
    <div className={`${tagsStyle} h-24 `}>
      <div className="h-full flex-shrink flex-grow basis-1/3 rounded-full">
        {imgUrl.length ? (
          <img
            src={imgUrl}
            alt=""
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full">
            <span className="m-auto text-4xl">➡️</span>
          </div>
        )}
      </div>
      <div className="flex-shrink flex-grow basis-2/3">
        <div>{tag}</div>
        <div>7 post</div>
      </div>
    </div>
  );
}

export default Tag;
