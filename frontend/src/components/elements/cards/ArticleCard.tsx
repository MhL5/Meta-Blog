import { ReactElement } from "react";
import { textTruncate } from "../../../utils/TextTruncate";
import { ArticleType } from "../../../services/getArticles";
import Img from "../image/Img";

type ArticleCardProps = { className?: string } & ArticleType;
function ArticleCard({
  className,
  title,
  avatar,
  summary,
  readingTime,
  topic,
}: ArticleCardProps): ReactElement {
  return (
    <div
      className={`${className} custom-hover || relative max-w-[48rem] cursor-pointer rounded-2xl border border-borderColor bg-cardBackgroundColor p-6`}
    >
      <article className="flex gap-6 sm:block">
        <div className="flex-shrink flex-grow basis-1/3 sm:h-80">
          <Img
            src={avatar}
            className="h-full w-full rounded-2xl object-cover"
          />
        </div>

        <div className="flex-shrink flex-grow basis-2/3">
          <span
            className={`topic-${topic.split(" ").join("")} || sm:font-base my-4 inline-block rounded-full border px-4 py-1 text-sm capitalize`}
          >
            {topic}
          </span>
          <h3 className="text-md mb-4 font-bold sm:text-2xl">{title}</h3>
        </div>

        <p className="mt-4 hidden sm:block  sm:h-36 sm:overflow-hidden sm:text-ellipsis">
          {textTruncate(summary, 150)}
        </p>

        <div className="absolute bottom-[2%] hidden sm:block">
          ⏱️ {readingTime} minutes read
        </div>
      </article>
    </div>
  );
}

export default ArticleCard;
