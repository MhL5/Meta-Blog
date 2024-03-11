import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

function useGetAuthors() {
  const {
    data: authors,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["authors"],
    queryFn: async () => {
      const { data: authors, error } = await supabase
        .from("authors")
        .select("*");
      if (error) throw new Error("Could not get the authors");
      return authors;
    },
  });

  return { authors, isLoading, error };
}

export { useGetAuthors };
