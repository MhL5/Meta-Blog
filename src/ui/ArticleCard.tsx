import { ReactElement } from "react";
import { textTruncate } from "../utils/TextTruncate";
import { TempFakeCardsDataType } from "./FeaturedPost";

type ArticleCardProps = TempFakeCardsDataType;

const tagColors = {
  travel: ` border-pink-800 bg-pink-800/20`,
  health: `border-green-600 bg-green-600/20`,
  lifestyle: `border-blue-800 bg-blue-800/20`,
  nature: `border-pink-400 bg-pink-400/20`,
  food: `border-purple-800 bg-purple-800/20`,
  technology: `border-orange-600 bg-orange-600/20`,
  inspiration: `border-sky-600 bg-sky-600/20`,
};

function ArticleCard({
  className,
  heading,
  imgUrl,
  paragraph,
  title,
  readingTime,
}: ArticleCardProps): ReactElement {
  return (
    <div
      className={`${className} relative max-w-[48rem] cursor-pointer rounded-2xl border border-borderColor bg-cardBackgroundColor p-6 `}
    >
      <article className="custom-card-shadow-on-hover ||| flex gap-6 sm:block">
        <div className="flex-shrink flex-grow basis-1/3 sm:h-80">
          <img
            src={imgUrl}
            alt=""
            className="h-full w-full rounded-2xl object-cover"
          />
        </div>

        <div className="flex-shrink flex-grow basis-2/3">
          <span
            className={`sm:font-base my-4 inline-block rounded-full border ${tagColors[title]} px-4 py-1 text-sm capitalize`}
          >
            {title}
          </span>
          <h3 className="text-md mb-4 font-bold sm:text-2xl">{heading}</h3>
        </div>

        <p className="mt-4 hidden sm:block  sm:h-36 sm:overflow-hidden sm:text-ellipsis">
          {textTruncate(paragraph, 150)}
        </p>

        <div className="absolute bottom-[2%] hidden sm:block">
          ⏱️ {readingTime} minutes read
        </div>
      </article>
    </div>
  );
}

export default ArticleCard;
