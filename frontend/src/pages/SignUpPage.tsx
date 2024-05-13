import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PageContainer from "@/components/layout/PageContainer";
import Logo from "@/components/ui/Logo";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";

const formSchema = z
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

export default function SignUpPage() {
  // 1. Define your form.
  const signUpForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });
  const loginForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function handleSignup(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  function handleLogin(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <PageContainer>
      <div className="min-h-dvh flex flex-col">
        <Header />
        <div className="m-auto p-8 capitalize">
          <Tabs defaultValue="signup" className="w-[400px]">
            <TabsList className="w-full ">
              <TabsTrigger className="m-auto w-full" value="signup">
                Sign up
              </TabsTrigger>
              <TabsTrigger className="m-auto w-full" value="login">
                Login
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Logo title="Meta Blog" className="scale-125 mb-2 p-1" />
                  </CardTitle>
                  <CardDescription className="text-center">
                    <span className="mb-4 mt-2 text-lg font-bold block">
                      Sign up
                    </span>
                    <span className="font-semibold">
                      Get access to members only content.
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...signUpForm}>
                    <form
                      onSubmit={signUpForm.handleSubmit(handleSignup)}
                      className="space-y-8"
                    >
                      {signUpFormFields.map(
                        ({ name, label, placeHolder, type }) => (
                          <FormField
                            key={name + label + placeHolder}
                            control={signUpForm.control}
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
                        )
                      )}

                      <Button type="submit" className="w-full">
                        Submit
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Logo title="Meta Blog" className="scale-125 mb-2 p-1" />
                  </CardTitle>
                  <CardDescription className="text-center">
                    <span className="mb-4 mt-2 text-lg font-bold block">
                      Login
                    </span>
                    <span className="font-semibold">
                      login into your account for full access
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
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
                        )
                      )}

                      <Button type="submit" className="w-full">
                        Submit
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <Footer className="mt-auto" />
      </div>
    </PageContainer>
  );
}
