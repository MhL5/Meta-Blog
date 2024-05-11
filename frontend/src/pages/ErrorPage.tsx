import { ReactElement } from "react";
import Button from "../components/elements/button/Button";
import DefaultPageContainer from "../components/layout/DefaultPageContainer";
import Header from "../components/layout/Header";
import Footer from "../components/layout/footer/Footer";

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
      <Footer />
    </DefaultPageContainer>
  );
}

export default ErrorPage;
