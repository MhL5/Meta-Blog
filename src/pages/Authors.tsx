import { ReactElement } from "react";
import DefaultPageContainer from "../ui/DefaultPageContainer";
import Header from "../ui/Header";

function Authors(): ReactElement {
  return (
    <DefaultPageContainer>
      <Header />
      Authors Page
    </DefaultPageContainer>
  );
}

export default Authors;
