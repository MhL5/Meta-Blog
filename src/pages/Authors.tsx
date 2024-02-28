import { ReactElement } from "react";
import NavigationMenu from "../ui/NavigationMenu";
import DefaultPageContainer from "../ui/DefaultPageContainer";

function Authors(): ReactElement {
  return (
    <DefaultPageContainer>
      <NavigationMenu />
      Authors Page
    </DefaultPageContainer>
  );
}

export default Authors;
