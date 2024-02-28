import { ReactElement } from "react";
import NavigationMenu from "../ui/NavigationMenu";
import Button from "../ui/Button";
import Logo from "../ui/Logo";
import DefaultPageContainer from "../ui/DefaultPageContainer";

function Login(): ReactElement {
  return (
    <DefaultPageContainer>
      <NavigationMenu />
      <div className="flex min-h-[85dvh] items-center justify-center">
        <form className="flex flex-col space-y-6 rounded-xl border border-white/20 bg-cardBackgroundColor p-14">
          <div className="">
            <Logo />
          </div>

          <div className="text-center">
            <h2 className="mb-4 mt-2 text-3xl font-bold">Sign In</h2>
            <p>Sign into your account for full access</p>
          </div>

          <div>
            <input
              type="text"
              className="w-full rounded-full border border-white/20 bg-bodyBackgroundColor px-4 py-2"
              placeholder="Your Email Address"
            />
          </div>

          <div>
            <input
              type="text"
              className="w-full rounded-full border border-white/20 bg-bodyBackgroundColor px-4 py-2"
              placeholder="Password"
            />
          </div>

          <Button variant="primary" el="button">
            Sign in
          </Button>
        </form>
      </div>
    </DefaultPageContainer>
  );
}

export default Login;
