import { z } from "zod";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { useLogin } from "./useLogin";

const loginFormSchema = z.object({
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
});

const loginFormFields = [
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
] as const;

export default function LoginForm() {
  const { login, isPending } = useLogin();

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "sapumr@gmail.com",
      password: "test1234",
    },
  });

  function handleLogin(values: z.infer<typeof loginFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    login(values, {
      onSuccess: () => {
        loginForm.reset();
      },
    });
  }

  return (
    <Form {...loginForm}>
      <form
        onSubmit={loginForm.handleSubmit(handleLogin)}
        className="space-y-8"
      >
        {loginFormFields.map(({ name, label, placeHolder, type }) => (
          <FormField
            key={name + label + placeHolder}
            control={loginForm.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input
                    required
                    type={type}
                    placeholder={placeHolder}
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <div className="flex items-center space-x-2">
          <Checkbox id="rememberMe" />
          <label
            htmlFor="rememberMe"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </label>
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
