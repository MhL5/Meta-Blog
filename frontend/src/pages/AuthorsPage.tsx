import { ReactElement } from "react";
import DefaultPageContainer from "../components/layout/DefaultPageContainer";
import Header from "../components/layout/Header";
import Authors from "../components/elements/cards/Authors";
import Footer from "../components/layout/Footer";

function AuthorsPage(): ReactElement {
  return (
    <DefaultPageContainer>
      <Header />
      <div className="min-h-dvh">
        <h2 className="mb-8 mt-10 text-center text-7xl font-bold">
          Our Amazing Authors:
        </h2>
        <Authors className="m-auto flex flex-wrap items-center justify-center gap-4" />
      </div>
      <Footer />
    </DefaultPageContainer>
  );
}

export default AuthorsPage;
