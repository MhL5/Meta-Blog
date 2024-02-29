import { ReactElement } from "react";
import DefaultPageContainer from "../ui/DefaultPageContainer";
import Header from "../ui/Header";
import AuthorsCard from "../ui/AuthorsCard";

function Authors(): ReactElement {
  return (
    <DefaultPageContainer>
      <Header />
      Authors Page
      <div className="grid lg:grid-cols-4">
        <AuthorsCard />
        <AuthorsCard />
        <AuthorsCard />
        <AuthorsCard />
        <AuthorsCard />
        <AuthorsCard />
      </div>
    </DefaultPageContainer>
  );
}

export default Authors;
