import prismaClient from "@/lib/prismaClient";
import { slugify } from "@/lib/utils";
import { Categories, Prisma } from "@prisma/client";

/**
 * search query can contain string tag category so we need to extract them
 * @example `git essentials #version_control  #git  #gitignore  #github`
 * returns {queryString: `git essentials`, queryTags: [`git`, `gitignore`, `github`], queryCategory: `version_control`}
 */
function extractTagsQueryCategory(input: string): {
  queryString: string;
  queryTags: string[];
  queryCategory: keyof typeof Categories | null;
} {
  const queryTags: string[] = [];
  const queryString: string[] = [];

  let queryCategory: keyof typeof Categories | null = null;
  const categories = Object.keys(Categories) as (keyof typeof Categories)[];

  input
    .trim()
    .split(" ")
    .forEach((subStr) => {
      if (subStr.startsWith("@")) {
        categories.forEach((category) => {
          const decodedCat = subStr.replace(`@`, "").toLowerCase();

          if (category === decodedCat) queryCategory = category;
        });
      }
      if (subStr.startsWith("#")) {
        const decodedTag = subStr.replace(`#`, "").toLowerCase();
        queryTags.push(decodedTag);
      } else queryString.push(subStr);
    });

  return { queryString: queryString.join(` `), queryTags, queryCategory };
}

/**
 * handles Search
 *
 * @Steps
 * 1. Parsing Request Body and validation
 * 2. Extracting tags queryString category from query, we need them for building the query
 * 3. Building the OR query
 * 4. Searching for articles based on query
 * 5. Returning the articles
 */
export async function POST(req: Request, res: Response) {
  try {
    // 1. Parsing Request Body and and validation
    // --------------------------------------------------------------------
    const { query } = await req.json();
    if (!query) throw new Error("No search query provided");

    // 2. Extracting tags queryString category from query, we need them for building the query
    // --------------------------------------------------------------------
    const { queryString, queryTags, queryCategory } =
      extractTagsQueryCategory(query);

    // 3. Building the OR query
    // --------------------------------------------------------------------

    /**
     * Building the query
     * query works based on article slug,content,tags and category(if it exist)
     */
    let orQuery: Prisma.ArticleWhereInput[] = [];

    if (!!queryString) {
      /**
       * To optimize performance,
       * instead of searching by title, we are using slugify and searching the database based on slug
       * slugs are unique and they are **indexed** in the database and they also contain the title,
       * Querying the database based on these slugs is more efficient than querying by titles.
       */
      const slugifySearchQuery = slugify(queryString, true);
      orQuery = [
        ...orQuery,
        {
          slug: { contains: slugifySearchQuery, mode: "insensitive" },
        },
        { content: { contains: queryString, mode: "insensitive" } },
      ];
    }
    if (queryTags.length > 0) {
      orQuery.push({ tags: { hasSome: queryTags } });
    }
    if (!!queryCategory) orQuery.push({ category: { equals: queryCategory } });

    // 4. Searching for articles based on query
    // --------------------------------------------------------------------

    const searchResult = await prismaClient.article.findMany({
      where: {
        OR: orQuery,
      },
      select: {
        id: true,
        avatar: true,
        title: true,
        slug: true,
      },
      orderBy: { id: "desc" },
    });

    // 5. Returning the articles
    // --------------------------------------------------------------------

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
      { status: 500 },
    );
  }
}
