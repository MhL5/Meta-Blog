import { ReactElement } from "react";
import Button from "../ui/Button";

function ErrorPage(): ReactElement {
  return (
    <>
      <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-7xl text-red-500">
        ERROR SOMETHING WENT WRONG
      </h1>
      <Button to="/" variant="primary" el="anchor">
        Homepage
      </Button>
    </>
  );
}

export default ErrorPage;
