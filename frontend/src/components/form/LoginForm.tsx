import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function handleLogin(values: z.infer<typeof loginFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    loginForm.reset();
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
                  <Input type={type} placeholder={placeHolder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}

/*
 <Form {...loginForm}>
                    <form
                      onSubmit={loginForm.handleSubmit(handleLogin)}
                      className="space-y-8"
                    >
                      {loginFormFields.map(
                        ({ name, label, placeHolder, type }) => (
                          <FormField
                            key={name + label + placeHolder}
                            control={loginForm.control}
                            name={name}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{label}</FormLabel>
                                <FormControl>
                                  <Input
                                    type={type}
                                    placeholder={placeHolder}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        ),
                      )}

                      <Button type="submit" className="w-full">
                        Submit
                      </Button>
                    </form>
                  </Form>
*/
