import prismaClient from "@/lib/prismaClient";
import { slugify } from "@/lib/utils";

/**
 * search query can contains tags so we need to extract them
 * @example `git essentials  #git  #gitignore  #github`
 * returns {queryString: `git essentials`, queryTags: [`#git`, `#gitignore`, `#github`]}
 */
function extractTagsAndQuery(input: string): {
  queryString: string;
  queryTags: string[];
} {
  const queryTags: string[] = [];
  const queryString: string[] = [];

  input
    .trim()
    .split(" ")
    .forEach((subStr) => {
      if (subStr.startsWith("#")) queryTags.push(subStr);
      else queryString.push(subStr);
    });

  return { queryString: queryString.join(` `), queryTags };
}

export async function GET(req: Request, res: Response) {
  try {
    const { searchParams } = new URL(req.url);

    const searchQuery = searchParams.get("query");
    if (!searchQuery) throw new Error("No search query provided");

    /**
     * search query can contains tags so we need to extract them
     * @example `git essentials  #git  #gitignore  #github`
     * returns {queryString: `git essentials`, queryTags: [`#git`, `#gitignore`, `#github`]}
     */
    const { queryString, queryTags } = extractTagsAndQuery(searchQuery);

    /**
     * To optimize performance,
     * instead of searching by title, we are using slugify and searching the database based on slug
     * slugs are unique and they are **indexed** in the database and they also contain the title,
     * Querying the database based on these slugs is more efficient than querying by titles.
     */
    const slugifySearchQuery = slugify(queryString, true);

    //   const extractTags = searchQuery.

    // slug content
    const searchResult = await prismaClient.article.findMany({
      where: {
        OR: [
          { slug: { contains: slugifySearchQuery, mode: "insensitive" } },
          { content: { contains: searchQuery, mode: "insensitive" } },
          { tags: { hasSome: queryTags } },
        ],
      },
      select: {
        id: true,
        avatar: true,
        title: true,
        slug: true,
      },
      orderBy: { id: "desc" },
    });

    return Response.json(
      { status: "success", data: { searchResult } },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      {
        status: "fail",
        error: `Error:⚠️ ${error instanceof Error ? error.message : error}`,
      },
      { status: 200 },
    );
  }
}
