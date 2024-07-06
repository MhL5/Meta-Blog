import { cachedAuth } from "@/lib/auth";
import AuthForm from "./AuthForm";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await cachedAuth();
  if (session?.user) redirect("/");

  return (
    <div className="mx-auto my-4 grid place-items-center">
      <AuthForm />
    </div>
  );
}
