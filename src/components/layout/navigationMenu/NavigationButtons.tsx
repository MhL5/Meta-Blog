import FormSubmitButton from "@/components/FormSubmitButton";
import { Button, ButtonProps } from "@/components/ui/button";
import { signOut } from "@/lib/auth";
import { LogOut } from "lucide-react";
import Link from "next/link";

export function HeaderLoginButton({
  className,
  ...props
}: { className?: string } & ButtonProps) {
  return (
    <Button
      variant="outline"
      size="xs"
      className={`${className} `}
      asChild
      {...props}
    >
      <Link href="/auth?tab=login">Login</Link>
    </Button>
  );
}

export function HeaderSignUpButton({
  className,
  ...props
}: { className?: string } & ButtonProps) {
  return (
    <Button asChild size="xs" className={`${className} w-full`} {...props}>
      <Link href="/auth?tab=signup">
        <span className="hidden lg:inline">Create free account</span>
        <span className="lg:hidden">Sign up</span>
      </Link>
    </Button>
  );
}

export function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
      className="w-full"
    >
      <FormSubmitButton
        variant="ghost"
        size="sm"
        type="submit"
        className="w-full justify-start"
        pendingLabel={
          <div className="flex w-full items-center justify-start gap-3">
            <span>Login out...</span>
          </div>
        }
      >
        <div className="flex w-full items-center space-x-4">
          <span>
            <LogOut className="h-5 w-5" />
          </span>
          <span className="gradient-underline-animation ||">Logout</span>
        </div>
      </FormSubmitButton>
    </form>
  );
}

