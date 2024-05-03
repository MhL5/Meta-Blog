import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

export type AuthorsType = {
  created_at: Date;
  name: string;
  bio: string;
  socialLinks: JSON;
  postsCount: number;
  views: number;
  likes: number;
  avatar: string;
  nationality: string;
};
type GetAuthorsResponse = {
  error: PostgrestError | null;
  data: AuthorsType[] | null;
};
async function getAuthors() {
  const { data: authors, error }: GetAuthorsResponse = await supabase
    .from("authors")
    .select("*");

  if (error) throw new Error("Could not get the authors");
  return authors;
}

export { getAuthors };
