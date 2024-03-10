import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

export type TopicType = {
  id: number;
  created_at: Date;
  topic: string;
  topicImage: string;
  topicPostsCount: number;
  topicColor: string;
};
type getTopicsResponse = {
  data: TopicType[] | null;
  error: PostgrestError | null;
};

async function getTopics() {
  const { data: topics, error }: getTopicsResponse = await supabase
    .from("topics")
    .select("*");

  if (error) throw new Error("Topics could not be loaded!");
  return topics;
}

export { getTopics };
