import { type ReactElement } from "react";
import { type TopicType } from "../../../services/getTopics";
import Img from "../image/Img";

type TopicProps = TopicType & { variation?: "small" | "big" };
const topicStyle = {
  default: `custom-hover cursor-pointer border border-borderColor bg-cardBackgroundColor`,
  small: {
    parent: `w-60 text-start relative flex  items-center justify-center gap-4  rounded-full  p-4   h-24`,
    img: `h-full w-full rounded-full object-cover`,
    imgParent: `h-full flex-shrink flex-grow basis-1/3 rounded-full`,
    topicsText: ``,
  },
  big: {
    parent: `grid p-6 rounded-lg  aspect-square w-80`,
    imgParent: `h-44  flex-shrink flex-grow basis-1/3 rounded-lg`,
    img: `h-full w-full rounded-md object-cover`,
    topicsText: `text-2xl font-bold mb-2`,
  },
};

function Topic({
  topic,
  topicImage,
  topicPostsCount,
  variation = "small",
}: TopicProps): ReactElement {
  return (
    <div className={`${topicStyle.default} ${topicStyle[variation].parent}  `}>
      <div className={`${topicStyle[variation].imgParent}`}>
        <Img src={topicImage} className={`${topicStyle[variation].img}`} />
      </div>
      <div className="flex-shrink flex-grow basis-2/3">
        <div className={`${topicStyle[variation].topicsText}`}>{topic}</div>
        <div>{topicPostsCount} post</div>
      </div>
    </div>
  );
}

export default Topic;
