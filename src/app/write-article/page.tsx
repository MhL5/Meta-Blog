import { cachedAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ArticleForm from "./ArticleForm";

/**
 * Since mdx editor does not support ssr, and ssr is set to false
 * we can not use server actions in the components, trying to use a server action results an error
 * a workaround is to use route handlers instead in this page
 */
export default async function Page() {
  const session = await cachedAuth();
  if (!session?.user) return redirect("/");

  return (
    <section className="mx-2 mt-16 w-full min-w-96 max-w-7xl rounded-lg border bg-background p-4">
      <ArticleForm />
    </section>
  );
}
