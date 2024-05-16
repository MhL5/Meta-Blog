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
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSignUp } from "@/features/authentication/useSignUp";

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

export default function SignUpForm() {
  const { isPending, mutate } = useSignUp();
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
    const user = mutate(values);
    console.log(user);
    // signUpForm.reset();
  }

  return (
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

        <Button type="submit" className="w-full">
          {isPending ? `LOADING...` : `Submit`}
        </Button>
      </form>
    </Form>
  );
}
