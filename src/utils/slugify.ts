import crypto from "crypto";

/**
 * Slugify
 * generate a slug from a string and adds a random string to avoid duplicates using crypto.
 *
 * @example
 * slugify('My New Post') returns 'my-new-post-07a85ca32ff56498'
 *
 * @example
 * slugify('My New Post',true) returns 'my-new-post'
 * withoutId is only intended to be used for search queries.
 * To optimize performance, we are using `{ withoutId: true }` to slugify user search queries.
 * slugs are unique and they are indexed in the database and they contain the title,
 * Querying the database based on these slugs is more efficient than querying by titles.
 * check search route handler in "/src/app/api/search/route.ts" to see the usage of this
 */
export function slugify(str: string, withoutId: boolean = false): string {
  const slugifyStr = `${str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")}`;

  if (withoutId) return slugifyStr;

  return `${slugifyStr}-${crypto.randomBytes(8).toString("hex")}`;
}
