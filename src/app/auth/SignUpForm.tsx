"use client";

import GoogleReCAPTCHA from "@/components/GoogleReCAPTCHA";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signUpAction } from "./action";
import GithubLoginButton from "./GithubLoginButton";
import GoogleLoginButton from "./GoogleLoginButton";
import signUpSchema, { SignUpSchemaType } from "./signUpSchema";

// raw data object for rendering inputs
const signUpFormFields = [
  {
    name: "name",
    placeHolder: "Full name",
    type: "text",
  },
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
  {
    name: "passwordConfirm",
    placeHolder: "password confirm",
    type: "password",
  },
] as const;

export default function SignUpForm() {
  const { toast } = useToast();
  const router = useRouter();
  const { execute, isExecuting } = useAction(signUpAction, {
    onSuccess({ data }) {
      toast({
        description: `Welcome to our community ${data?.data.user.name} 🎉.`,
      });
      router.replace("/auth?tab=login");
    },
    onError() {
      toast({
        variant: "destructive",
        description: `Something went wrong!`,
      });
    },
  });

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      captcha: "",
    },
  });

  function onSubmit(values: SignUpSchemaType) {
    execute(values);
  }

  function handleCaptcha(val: string | null) {
    form.setValue("captcha", val || "");
  }

  return (
    <div className="w-full px-12 py-8">
      <h2 className="mb-5 text-center text-2xl font-semibold">
        Create a free account
      </h2>

      <div className="flex gap-2">
        <GoogleLoginButton className="basis-1/2" disabled={isExecuting} />
        <GithubLoginButton className="basis-1/2" disabled={isExecuting} />
      </div>

      <div className="my-5 flex w-full items-center">
        <span className="h-[0.7px] w-full bg-secondary"></span>
        <span className="mx-1 text-sm font-semibold">OR</span>
        <span className="h-[0.7px] w-full bg-secondary"></span>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center space-y-4"
        >
          {signUpFormFields.map(({ name, placeHolder, type }) => {
            let valid = "";

            if (form.getValues(name)?.length > 0) {
              !!form.formState.dirtyFields[name] && !form.formState.errors[name]
                ? (valid = "border-b-[3px] border-b-green-500")
                : (valid = "border-b-[3px] border-b-red-500");
            }

            return (
              <FormField
                key={name + placeHolder}
                control={form.control}
                name={name}
                disabled={isExecuting}
                render={({ field }) => (
                  <FormItem className="w-80 px-1 font-semibold">
                    <FormControl>
                      <Input
                        type={type}
                        placeholder={placeHolder}
                        {...field}
                        className={`w-full duration-300 ${valid}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}

          <FormField
            control={form.control}
            name="bio"
            disabled={isExecuting}
            render={({ field }) => (
              <FormItem className="w-80 px-1 font-semibold">
                <FormControl>
                  <Textarea
                    placeholder="Bio: Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <GoogleReCAPTCHA onChange={handleCaptcha} />
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
            {isExecuting ? `loading...` : `Create free account`}
          </Button>

          <div className="px-2 pt-2 text-center text-sm">
            <span>
              Already have an account?
              <Button
                variant="link"
                size="sm"
                className="text-blue-500 underline"
                disabled={isExecuting}
              >
                <Link href="/auth?tab=login">login</Link>
              </Button>
            </span>
          </div>
        </form>
      </Form>
    </div>
  );
}
