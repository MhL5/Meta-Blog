import { ReactElement } from "react";
import { useGetTopics } from "../../../hooks/useGetTopics";
import Topic from "./Topic";
type TopicsProps = { variation?: "small" | "big" };
function Topics({ variation = `small` }: TopicsProps): ReactElement {
  const { topics, error, isLoading } = useGetTopics();

  if (isLoading) return <span>loading...</span>;
  if (error || !topics) return <span>error</span>;
  return (
    <div className="flex max-w-globalWidthContent flex-wrap items-center justify-center gap-4 p-2 text-center ">
      {topics.map((topic) => (
        <Topic {...topic} key={topic.id} variation={variation} />
      ))}
    </div>
  );
}

export default Topics;
