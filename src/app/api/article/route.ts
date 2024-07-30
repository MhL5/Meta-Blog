import writeArticleSchema from "@/app/write-article/writeArticleSchema";
import { auth, isValidGoogleCaptcha } from "@/lib/auth";
import prismaClient from "@/lib/prismaClient";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";

/**
 * This function is used to create a new article in the database.
 * ## Steps:
 * 1. receives input as json
 * 2. validates input using zod and extracts captcha string from blogData
 * 3. google captcha validation
 * 4. checks if user is logged in
 * 5. creates a new slug for the article
 * 6. creates a new record and overwrites the content with the sanitized version
 * 7. clear cache
 * 8. send the response to client
 */
export async function POST(req: Request, res: Response) {
  try {
    // 1. receives input
    const blogData = await req.json();
    // 2. validates input using zod and extracts captcha string from blogData
    const { captcha, ...validBlogData } = writeArticleSchema.parse(blogData);

    // 3. google captcha validation
    if (!isValidGoogleCaptcha(captcha))
      throw new Error("Google Captcha verification failed! please try again.");

    // 4. checks if user is logged in
    const session = await auth();
    if (!session?.user?.id)
      throw new Error("Something went wrong! please login and try again.");

    // 5. creates a new slug for the article
    const articleSlug = `${slugify(validBlogData.title)}`;

    // 6. creates a new record and overwrites the content with the sanitized version
    await prismaClient.article.create({
      data: {
        ...validBlogData,
        authorId: session.user.id,
        slug: articleSlug,
      },
    });

    // 7. clear cache
    revalidatePath("/");

    // 8. send the response to client
    return Response.json({ status: "success", articleSlug }, { status: 201 });
  } catch (error) {
    return Response.json(
      { status: "fail", message: "Something went wrong! please try again." },
      {
        status: 500,
      },
    );
  }
}
