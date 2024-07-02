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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import ReCAPTCHA from "react-google-recaptcha";

// raw data object for rendering inputs
const signUpFormFields = [
  {
    name: "name",
    label: "full name",
    placeHolder: "Your Name",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeHolder: "example@email.com",
    type: "email",
  },
  {
    name: "password",
    label: "password",
    placeHolder: "********",
    type: "password",
  },
  {
    name: "passwordConfirm",
    label: "Password confirm",
    placeHolder: "********",
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
    <div className="border rounded-lg py-8 px-12 w-80">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {signUpFormFields.map(({ name, label, placeHolder, type }) => (
            <FormField
              key={name + label + placeHolder}
              control={form.control}
              name={name}
              disabled={isExecuting}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    <Input type={type} placeholder={placeHolder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <FormField
            key="GoogleCaptcha"
            control={form.control}
            name="captcha"
            disabled={isExecuting}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2 justify-between">
            <Button
              className="basis-1/2"
              type="reset"
              variant="secondary"
              disabled={isExecuting}
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit" disabled={isExecuting} className="basis-1/2">
              {isExecuting ? `loading...` : `submit`}
            </Button>
          </div>
        </form>
        {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={handleCaptcha}
          />
        ) : (
          "Warning!"
        )}
      </Form>
    </div>
  );
}
