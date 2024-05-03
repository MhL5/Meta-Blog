import { FormEvent, ReactElement, useState } from "react";
import Button from "../../components/elements/button/Button";
import Logo from "../../components/elements/icons/Logo";
import { createPortal } from "react-dom";
import { useAuthContext } from "./AuthContext";

function Login(): ReactElement {
  const { handleLogin, isWorking, show } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    handleLogin({ email, password });
  }

  return createPortal(
    <>
      <div
        className={`${show ? "fixed" : "hidden"}  left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2`}
      >
        <div className="flex min-h-dvh flex-col">
          <form
            className="m-auto flex w-[30rem] flex-col space-y-6 rounded-xl border border-borderColor bg-cardBackgroundColor p-10"
            onSubmit={handleSubmit}
          >
            <div>
              <Logo />
            </div>

            <div className="text-center">
              <h2 className="mb-4 mt-2 text-3xl font-bold">Login</h2>
              <p>login into your account for full access</p>
            </div>

            <div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="w-full rounded-lg border border-borderColor bg-bodyBackgroundColor px-4 py-2"
                placeholder="Your Email Address"
                required
                disabled={isWorking}
              />
            </div>

            <div>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-full rounded-lg border border-borderColor bg-bodyBackgroundColor px-4 py-2"
                placeholder="Password"
                disabled={isWorking}
              />
            </div>

            <Button
              variant="primary"
              el="button"
              className="rounded-lg"
              disabled={isWorking}
            >
              login
            </Button>
            <div className="mt-4 text-center">
              Don't have an account yet?{" "}
              <Button
                el="anchor"
                variant="transparent"
                to="/signup"
                className="cursor-pointer px-0 font-bold text-blue-600 underline"
              >
                {" "}
                Sign up{" "}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.body,
  );
}

export default Login;
