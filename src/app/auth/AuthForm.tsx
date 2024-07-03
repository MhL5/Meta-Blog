import { Tabs } from "@/components/ui/tabs";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";

const tabs = [
  {
    title: "Sign up",
    value: "signUp",
    content: (
      <div className="w-full overflow-hidden relative h-full rounded-lg bg-background border">
        <SignUpForm />
      </div>
    ),
  },
  {
    title: "Login",
    value: "login",
    content: (
      <div className="w-full overflow-hidden relative h-full rounded-lg bg-background border">
        <LoginForm />
      </div>
    ),
  },
];

export default function AuthForm() {
  return (
    <section className="h-[20rem] min-w-[350px] sm:min-w-[400px] md:h-[40rem] [perspective:1000px] relative b flex flex-col mx-auto w-full  items-start justify-start my-8">
      <Tabs
        tabs={tabs}
        containerClassName="bg-muted p-1 h-10 rounded-lg text-muted-foreground flex gap-4 justify-between"
        contentClassName="mt-2 h-auto"
        tabClassName="basis-1/2 text-sm p-1 font-medium"
        activeTabClassName="rounded-md"
      />
    </section>
  );
}
