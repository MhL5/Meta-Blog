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
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { loginAction } from "./action";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const { execute, isExecuting } = useAction(loginAction, {
    onSuccess() {
      toast({
        title: "Welcome back",
        description: `You are now logged in.`,
      });
      router.replace("/");
    },
    onError(err) {
      toast({
        variant: "destructive",
        title: "login failed",
        description: `${err.error.serverError || "something went wrong! please try again."}`,
      });
    },
  });

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
    execute({ ...values });
  }

  return (
    <div className="w-full px-12 py-8">
      <h2 className="m-2 mb-5 text-center text-2xl font-semibold">
        Log in to your account
      </h2>

      <div className="flex gap-2">
        <GoogleLoginButton className="basis-1/2" disabled={isExecuting} />
        <GithubLoginButton className="basis-1/2" disabled={isExecuting} />
      </div>

      <div className="my-8 flex w-full items-center">
        <span className="h-[0.7px] w-full bg-secondary"></span>
        <span className="mx-1 text-sm font-semibold">OR</span>
        <span className="h-[0.7px] w-full bg-secondary"></span>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center space-y-6"
        >
          {loginFormFields.map(({ name, placeHolder, type }) => (
            <FormField
              key={name + placeHolder}
              control={form.control}
              name={name}
              disabled={isExecuting}
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

          <GoogleReCAPTCHA
            onChange={(val) => form.setValue("captcha", val || "")}
          />
          <FormField
            key="GoogleCaptcha"
            control={form.control}
            name="captcha"
            disabled={isExecuting}
            render={({ field }) => (
              <FormItem className="m-0 space-y-0 p-0">
                <FormControl>
                  <Input type="text" className="hidden" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isExecuting}
            className="w-full"
            variant="secondary"
          >
            {isExecuting ? `loading...` : `Login`}
          </Button>
        </form>
      </Form>
      <div className="my-4 px-2 pt-4 text-center text-sm">
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
