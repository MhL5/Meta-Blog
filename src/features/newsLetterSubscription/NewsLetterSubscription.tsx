"use client";

import { subscribeToNewsLetter } from "@/features/newsLetterSubscription/actions";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Input } from "@/components/ui/input";
import { FormEvent, useState, useTransition } from "react";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

const emailSchema = z.string().email();

export default function NewsLetterSubscription() {
  const [pending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const validEmail = emailSchema.parse(email);
    startTransition(async () => {
      const res = await subscribeToNewsLetter(validEmail);
      setEmail("");
      if (res?.data?.status === "success")
        toast({ description: `${res?.data?.message + " 🎉"}` });
      else
        toast({
          variant: "destructive",
          description: `${res?.data?.message + " 🎉"}`,
        });
    });
  }

  return (
    <div className="h-[20rem] w-full rounded-md bg-muted/50 backdrop-blur-md shadow-xl border-[0.1px] relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-5xl md:mb-6  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Meta Blog newsletter
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10 mt-6">
          Don&apos;t miss anything. Get all the latest posts delivered straight
          to your inbox. It&apos;s free!
        </p>

        <form
          onSubmit={onSubmit}
          className="relative flex gap-4 items-center justify-center mt-4"
        >
          <Input
            type="email"
            value={pending ? "Subscribing..." : email}
            disabled={pending}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 bg-muted placeholder:text-neutral-700"
          />
          <Button
            size="md"
            variant="outline"
            className="z-10"
            disabled={pending}
          >
            Subscribe
          </Button>
        </form>
      </div>
      <BackgroundBeams />
    </div>
  );
}
