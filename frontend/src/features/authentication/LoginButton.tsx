import { type ReactElement } from "react";
import Button from "../../components/elements/button/Button";
import { useAuthContext } from "./AuthContext";

function LoginButton(): ReactElement {
  const { setShow } = useAuthContext();
  return (
    <Button
      variant="transparent"
      el="button"
      className="mr-2 inline-block duration-300 hover:translate-y-[-4px]"
      onClick={() => setShow((show) => !show)}
    >
      Login
    </Button>
  );
}

export default LoginButton;
