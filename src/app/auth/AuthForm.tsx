import { Tabs } from "@/components/ui/tabs";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";

const tabs = [
  {
    title: "Sign up",
    value: "signUp",
    content: (
      <div className="relative h-full w-full overflow-hidden rounded-lg border bg-background shadow-2xl">
        <SignUpForm />
      </div>
    ),
  },
  {
    title: "Login",
    value: "login",
    content: (
      <div className="relative h-full w-full overflow-hidden rounded-lg border bg-background shadow-2xl">
        <LoginForm />
      </div>
    ),
  },
];

export default function AuthForm() {
  return (
    <section className="relative mx-auto my-8 flex h-[20rem] w-[350px] flex-col items-start justify-start px-2 [perspective:1000px] sm:min-w-[400px] md:h-[40rem]">
      <Tabs
        tabs={tabs}
        containerClassName="bg-muted p-1 h-10 rounded-lg text-muted-foreground flex gap-4 justify-between shadow-lg"
        contentClassName="mt-2 h-auto"
        tabClassName="basis-1/2 text-sm p-1 font-medium"
        activeTabClassName="rounded-md"
      />
    </section>
  );
}
