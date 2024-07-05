"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import GoogleReCAPTCHA from "@/components/GoogleReCAPTCHA";
import GoogleLoginButton from "./GoogleLoginButton";
import GithubLoginButton from "./GithubLoginButton";
import loginSchema, { LoginSchemaType } from "./loginSchema";
import { signIn } from "next-auth/react";
import { useTransition } from "react";
import Link from "next/link";

// raw data object for rendering inputs
const loginFormFields = [
  {
    name: "email",
    placeHolder: "email",
    type: "email",
  },
  {
    name: "password",
    placeHolder: "password",
    type: "password",
  },
] as const;

export default function LoginForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      captcha: "",
    },
  });

  async function onSubmit(values: LoginSchemaType) {
    try {
      startTransition(async () => {
        await signIn("credentials", { callbackUrl: "/", ...values });
      });
    } catch (error) {
      if (error instanceof Error)
        toast({
          title: "login failed",
          description: `${error?.message}`,
        });

      toast({
        title: "login failed",
        description: `${error}`,
      });
    }
  }

  function handleCaptcha(val: string | null) {
    form.setValue("captcha", val || "");
  }

  return (
    <div className="py-8 px-12 w-full">
      <h2 className="text-center font-semibold text-2xl mb-5 m-2">
        Log in to your account
      </h2>

      <div className="flex gap-2">
        <GoogleLoginButton className="basis-1/2" disabled={isPending} />
        <GithubLoginButton className="basis-1/2" disabled={isPending} />
      </div>

      <div className="flex w-full items-center my-8">
        <span className="bg-secondary h-[0.7px] w-full"></span>
        <span className="mx-1 font-semibold text-sm">OR</span>
        <span className="bg-secondary h-[0.7px] w-full"></span>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex flex-col items-center"
        >
          {loginFormFields.map(({ name, placeHolder, type }) => (
            <FormField
              key={name + placeHolder}
              control={form.control}
              name={name}
              disabled={isPending}
              render={({ field }) => {
                let valid = "";

                if (form.getValues(name)?.length > 0) {
                  !!form.formState.dirtyFields[name] &&
                  !form.formState.errors[name]
                    ? (valid = "border-b-[3px] border-b-green-500")
                    : (valid = "border-b-[3px] border-b-red-500");
                }

                return (
                  <FormItem className="w-80 px-1">
                    <FormControl>
                      <Input
                        type={type}
                        placeholder={placeHolder}
                        {...field}
                        className={`w-full duration-300 ${valid} `}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          ))}

          <GoogleReCAPTCHA onChange={handleCaptcha} />
          <FormField
            key="GoogleCaptcha"
            control={form.control}
            name="captcha"
            disabled={isPending}
            render={({ field }) => (
              <FormItem className="p-0 m-0 space-y-0">
                <FormControl>
                  <Input type="text" className="hidden" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isPending}
            className="w-full"
            variant="secondary"
          >
            {isPending ? `loading...` : `Login`}
          </Button>
        </form>
      </Form>
      <div className="px-2 my-4 pt-4 text-center text-sm">
        <span>
          Don&apos;t have an account?{" "}
          <Button variant="link" size="sm" className="text-blue-500 underline">
            <Link href="/auth?tab=signup">Sign up</Link>
          </Button>
        </span>
      </div>
    </div>
  );
}
