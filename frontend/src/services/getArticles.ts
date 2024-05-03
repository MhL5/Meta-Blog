import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

export type ArticleType = {
  avatar: string;
  content: string;
  created_at: Date;
  id: number;
  readingTime: number;
  summary: string;
  title: string;
  topic: string;
};
type GetArticleResponse = {
  data: ArticleType[] | null;
  error: PostgrestError | null;
};

async function getArticles() {
  const { data: articles, error }: GetArticleResponse = await supabase
    .from("articles")
    .select("*");

  if (error) throw new Error("Articles could not be loaded");
  return articles;
}

export { getArticles };
