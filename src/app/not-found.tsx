import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60dvh] grid place-items-center text-center">
      <main className="space-y-6">
        <h1 className="text-3xl font-semibold">
          This page could not be found ☹️
        </h1>

        <Button asChild>
          <Link
            href="/"
            className="bg-accent-500 text-primary-800 btn btn-primary inline-block px-6 py-3 text-lg"
          >
            Go back home
          </Link>
        </Button>
      </main>
    </div>
  );
}
