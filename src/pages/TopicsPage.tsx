import { ReactElement } from "react";
import DefaultPageContainer from "../ui/DefaultPageContainer";
import Header from "../ui/Header";
import Topics from "../ui/Topics";

function TopicsPage(): ReactElement {
  return (
    <DefaultPageContainer>
      <Header />
      <div className="flex flex-col items-center justify-center">
        <h2 className="my-14 text-7xl font-bold">Topics</h2>
        <Topics variation="big" />
      </div>
    </DefaultPageContainer>
  );
}

export default TopicsPage;
