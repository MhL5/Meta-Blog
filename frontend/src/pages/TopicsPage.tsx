import { ReactElement } from "react";
import DefaultPageContainer from "../components/layout/DefaultPageContainer";
import Header from "../components/layout/Header";
import Topics from "../components/elements/cards/Topics";
import Footer from "../components/layout/footer/Footer";

function TopicsPage(): ReactElement {
  return (
    <DefaultPageContainer>
      <Header />
      <div className="flex flex-col items-center justify-center">
        <h2 className="my-14 text-7xl font-bold">Topics</h2>
        <Topics variation="big" />
      </div>

      <Footer className="mt-20" />
    </DefaultPageContainer>
  );
}

export default TopicsPage;
