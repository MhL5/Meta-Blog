"use client";

import { subscribeToNewsLetter } from "@/features/newsLetterSubscription/actions";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";

const emailSchema = z.string().email();

export default function NewsLetterSubscription() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const { execute, isExecuting } = useAction(subscribeToNewsLetter, {
    onSuccess(res) {
      toast({ description: `${res?.data?.message + " 🎉"}` });
      setEmail("");
    },
    onError(err) {
      toast({
        variant: "destructive",
        description: `${err.error.serverError}`,
      });
    },
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validEmail = emailSchema.safeParse(email);
    if (!validEmail.success)
      toast({
        variant: "destructive",
        description: `Invalid email, please try again with a valid email.`,
      });
    execute(validEmail);
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
          onSubmit={handleSubmit}
          className="relative flex gap-4 items-center justify-center mt-4"
        >
          <Input
            type="email"
            required
            value={isExecuting ? "Subscribing..." : email}
            disabled={isExecuting}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            className="transition-all duration-300 rounded-lg border border-neutral-800 focus:ring-2 focus:!ring-border  w-full relative z-10 bg-muted placeholder:text-neutral-700"
          />
          <Button
            size="md"
            variant="outline"
            className="absolute rounded-md dark:hover:bg-green-700 dark:hover:text-slate-100 right-[0.2%] border h-9 z-10 bg-green-400 focus:!ring-border dark:text-slate-300 dark:bg-green-950 duration-300 transition-all"
            disabled={isExecuting}
          >
            Subscribe
          </Button>
        </form>
      </div>
      <BackgroundBeams />
    </div>
  );
}
