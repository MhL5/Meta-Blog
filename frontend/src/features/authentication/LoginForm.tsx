import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useLogin } from "./useLogin";
import { useAuthContext } from "./AuthContext";

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
  const [rememberMe, setRememberMe] = useState(false);
  const { handlePersistLogin } = useAuthContext();

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "sapumr@gmail.com",
      password: "test1234",
    },
  });

  function handleLogin(values: z.infer<typeof loginFormSchema>) {
    login(values, {
      onSuccess: () => {
        if (rememberMe) handlePersistLogin();
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
          <Checkbox
            id="rememberMe"
            name="persistLogin"
            checked={rememberMe}
            onClick={() => setRememberMe((rm) => !rm)}
          />
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
