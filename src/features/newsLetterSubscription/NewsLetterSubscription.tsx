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
    if (!validEmail.success) {
      toast({
        variant: "destructive",
        description: `Invalid email, please try again with a valid email.`,
      });
      return;
    }
    execute(validEmail.data);
  }

  return (
    <div className="relative my-16 flex h-[20rem] w-full flex-col items-center justify-center rounded-md border-[0.1px] bg-muted/50 antialiased shadow-xl">
      <div className="mx-auto max-w-2xl p-4">
        <h1 className="relative z-10 bg-gradient-to-b from-neutral-200 to-neutral-600 bg-clip-text text-center font-sans text-lg font-bold text-transparent md:mb-6 md:text-5xl">
          Meta Blog newsletter
        </h1>
        <p className="relative z-10 mx-auto my-2 mt-6 max-w-lg text-center text-sm text-neutral-500">
          Don&apos;t miss anything. Get all the latest posts delivered straight
          to your inbox. It&apos;s free!
        </p>

        <form
          onSubmit={handleSubmit}
          className="relative mt-4 flex items-center justify-center gap-4"
        >
          <Input
            type="email"
            required
            value={isExecuting ? "Subscribing..." : email}
            disabled={isExecuting}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            className="relative z-10 w-full rounded-lg border border-neutral-800 bg-muted transition-all duration-300 placeholder:text-neutral-700 focus:ring-2 focus:!ring-border"
          />
          <Button
            size="md"
            variant="outline"
            className="absolute right-[0.2%] z-10 h-9 rounded-md border bg-green-400 transition-all duration-300 focus:!ring-border dark:bg-green-950 dark:text-slate-300 dark:hover:bg-green-700 dark:hover:text-slate-100"
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
