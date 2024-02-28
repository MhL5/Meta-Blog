import { type ReactElement } from "react";
import DefaultPageContainer from "../ui/DefaultPageContainer";
import Header from "../ui/Header";
import Logo from "../ui/Logo";
import Button from "../ui/Button";

function SignUp(): ReactElement {
  return (
    <DefaultPageContainer>
      <div className="flex min-h-dvh flex-col">
        <Header />

        <form className="m-auto flex w-[30rem] flex-col space-y-6 rounded-xl border border-borderColor bg-cardBackgroundColor p-10">
          <div>
            <Logo />
          </div>

          <div className="text-center">
            <h2 className="mb-4 mt-2 text-3xl font-bold">Sign Up</h2>
            <p>Get access to members only content.</p>
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              className="w-full rounded-lg border border-borderColor bg-bodyBackgroundColor px-4 py-2"
              placeholder="First Name"
            />
            <input
              type="text"
              className="w-full rounded-lg border border-borderColor bg-bodyBackgroundColor px-4 py-2"
              placeholder="Last Name"
            />
          </div>

          <div>
            <input
              type="text"
              className="w-full rounded-lg border border-borderColor bg-bodyBackgroundColor px-4 py-2"
              placeholder="Your Email Address"
            />
          </div>

          <div>
            <input
              type="text"
              className="w-full rounded-lg border border-borderColor bg-bodyBackgroundColor px-4 py-2"
              placeholder="Password"
            />
          </div>

          <div>
            <input
              type="text"
              className="w-full rounded-lg border border-borderColor bg-bodyBackgroundColor px-4 py-2"
              placeholder="Confirm Password"
            />
          </div>

          <Button variant="primary" el="button" className="rounded-lg">
            Sign in
          </Button>
          <div className="mt-4 text-center">
            Don't have an account yet?{" "}
            <button
              type="button"
              className="cursor-pointer font-bold text-blue-600 underline"
            >
              {" "}
              Sign up{" "}
            </button>
          </div>
        </form>
      </div>
    </DefaultPageContainer>
  );
}

export default SignUp;
