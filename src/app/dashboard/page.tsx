import { cachedAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await cachedAuth();
  if (!session?.user) return redirect("/");

  return (
    <div className="grid min-h-[50dvh] place-items-center">
      <div className="text-4xl">Work in progress, not done yet ☹️</div>
    </div>
  );
}
