"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUpAction } from "./action";
import { useAction } from "next-safe-action/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import signUpSchema, { SignUpSchemaType } from "./signUpSchema";
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
  const { execute, isExecuting } = useAction(signUpAction, {
    onSuccess({ data }) {
      toast({
        description: `Welcome to our community ${data?.data.user.name} 🎉.`,
      });
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

  async function onSubmit(values: SignUpSchemaType) {
    execute(values);
  }

  function handleCaptcha(val: string | null) {
    form.setValue("captcha", val || "");
  }

  return (
    <div className="py-8 px-12 w-full">
      <h2 className="text-center font-semibold text-2xl mb-5">
        Create a free account
      </h2>

      <div className="flex gap-2">
        <GoogleLoginButton className="basis-1/2" disabled={false} />
        <GithubLoginButton className="basis-1/2" disabled={false} />
      </div>

      <div className="flex w-full items-center my-5">
        <span className="bg-secondary h-[0.7px] w-full"></span>
        <span className="mx-1 font-semibold text-sm">OR</span>
        <span className="bg-secondary h-[0.7px] w-full"></span>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col items-center"
        >
          {signUpFormFields.map(({ name, placeHolder, type }) => (
            <FormField
              key={name + placeHolder}
              control={form.control}
              name={name}
              disabled={isExecuting}
              render={({ field }) => (
                <FormItem className="w-80 px-1">
                  <FormControl>
                    <Input
                      type={type}
                      placeholder={placeHolder}
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <GoogleReCAPTCHA onChange={handleCaptcha} />
          <FormField
            key="GoogleCaptcha"
            control={form.control}
            name="captcha"
            disabled={isExecuting}
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
                // TODO: onClick={() => onTabChange("login")}
              >
                login
              </Button>
            </span>
          </div>
        </form>
      </Form>
    </div>
  );
}
