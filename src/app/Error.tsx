"use client";

import { Button } from "@/components/ui/button";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className="my-24 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="my-8 text-lg font-bold text-red-500">{error.message}</p>

      <Button className="my-12" onClick={reset}>
        Try again
      </Button>
    </main>
  );
}
