import Logo from "@/components/ui/Logo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/features/authentication/LoginForm";
import SignUpForm from "@/features/authentication/SignUpForm";
import { useState } from "react";

export default function SignUpTab() {
  const [tabVal, setTabVal] = useState("signup");

  function handleTab(tab: "signup" | "login") {
    setTabVal(tab);
  }

  return (
    <Tabs
      value={tabVal}
      onValueChange={setTabVal}
      defaultValue="signup"
      className="w-[330px] sm:w-[400px]"
    >
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
              <Logo
                title="Meta Blog"
                className="mb-2 scale-125 p-1"
                disableLink
              />
            </CardTitle>

            <CardDescription className="text-center">
              <span className="mb-4 mt-2 block text-lg font-bold">Sign up</span>
              <span className="font-semibold">
                Get access to members only content.
              </span>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <SignUpForm onTabChange={handleTab} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>
              <Logo
                title="Meta Blog"
                disableLink
                className="mb-2 scale-125 p-1"
              />
            </CardTitle>

            <CardDescription className="text-center">
              <span className="mb-4 mt-2 block text-lg font-bold">Login</span>
              <span className="font-semibold">
                login into your account for full access
              </span>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
