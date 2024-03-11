import { ReactElement } from "react";
import DefaultPageContainer from "../ui/DefaultPageContainer";
import Header from "../ui/Header";
import Authors from "../ui/Authors";

function AuthorsPage(): ReactElement {
  return (
    <DefaultPageContainer>
      <Header />
      <h2 className="mb-8 mt-10 text-center text-7xl font-bold">
        Our Amazing Authors:
      </h2>
      <Authors className="m-auto flex flex-wrap items-center justify-center gap-4" />
    </DefaultPageContainer>
  );
}

export default AuthorsPage;
