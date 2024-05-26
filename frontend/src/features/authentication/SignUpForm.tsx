import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useSignUp } from "@/features/authentication/useSignUp";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Spinner from "@/components/ui/Spinner";

type SignUpFormProps = {
  onTabChange: (tab: "signup" | "login") => void;
};

const signUpFormSchema = z
  .object({
    fullName: z
      .string({
        required_error: "Name is required",
        invalid_type_error:
          "full name should be between 4 and 50 characters long. Try again please",
      })
      .min(4)
      .max(50),
    email: z
      .string({
        required_error: "email is required",
        invalid_type_error: "email is not a valid email. Try again please",
      })
      .email(),
    password: z
      .string({
        required_error: "password is required",
        invalid_type_error:
          "password should be between 8 and 20 characters long. Try again please",
      })
      .min(8)
      .max(20),
    passwordConfirm: z
      .string({
        required_error: "confirm password is required",
        invalid_type_error:
          "confirm password should be between 8 and 20 characters long. Try again please",
      })
      .min(8)
      .max(20),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords must match",
    path: ["passwordConfirm"], // This specifies where the error should be attached in case of mismatch
  });

const signUpFormFields = [
  {
    name: "fullName",
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

export default function SignUpForm({ onTabChange }: SignUpFormProps) {
  const { isPending, SignUp } = useSignUp();
  const [showDialog, setShowDialog] = useState(false);

  // 1. Define your form.
  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  async function handleSignup(values: z.infer<typeof signUpFormSchema>) {
    SignUp(values, {
      onSuccess: () => {
        setShowDialog(true);
      },
    });

    signUpForm.reset();
  }

  return (
    <>
      <Form {...signUpForm}>
        <form
          onSubmit={signUpForm.handleSubmit(handleSignup)}
          className="space-y-8"
        >
          {signUpFormFields.map(({ name, label, placeHolder, type }) => (
            <FormField
              key={name + label + placeHolder}
              control={signUpForm.control}
              name={name}
              disabled={isPending}
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

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? <Spinner /> : `Submit`}
          </Button>
          <Button type="submit" className="w-full" variant="secondary" disabled={isPending}>
            {isPending ? <Spinner /> : `sign up with Google`}
          </Button>
        </form>

        <div className="px-2 pt-4 text-center text-sm">
          <span>
            Already have an account?
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onTabChange("login")}
            >
              <span className="text-blue-500 underline underline-offset-2">
                login
              </span>
            </Button>
          </span>
        </div>
      </Form>

      <Dialog open={showDialog} onOpenChange={() => setShowDialog((s) => !s)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Welcome to Meta Blog community 🎉</DialogTitle>
            <DialogDescription className="pt-4">
              You can activate your account using the link we sent to your
              Gmail.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="mr-auto"
              size="sm"
              onClick={() => onTabChange("login")}
            >
              Login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
