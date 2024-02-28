import { ReactElement } from "react";
import Button from "../ui/Button";
import DefaultPageContainer from "../ui/DefaultPageContainer";

function ErrorPage(): ReactElement {
  return (
    <DefaultPageContainer>
      <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-7xl text-red-500">
        ERROR SOMETHING WENT WRONG
      </h1>
      <Button to="/" variant="primary" el="anchor">
        Homepage
      </Button>
    </DefaultPageContainer>
  );
}

export default ErrorPage;
