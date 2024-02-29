import { ReactElement } from "react";
import Button from "../ui/Button";
import DefaultPageContainer from "../ui/DefaultPageContainer";
import Header from "../ui/Header";

function ErrorPage(): ReactElement {
  return (
    <DefaultPageContainer>
      <div className="flex min-h-dvh flex-col">
        <Header />
        <div className="m-auto text-center">
          <div className="my-14 text-7xl">ERROR: SOMETHING WENT WRONG!😥</div>
          <Button to="/" variant="primary" el="anchor">
            Homepage
          </Button>
        </div>
      </div>
    </DefaultPageContainer>
  );
}

export default ErrorPage;
