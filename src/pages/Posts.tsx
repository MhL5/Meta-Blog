import { ReactElement } from "react";
import DefaultPageContainer from "../ui/DefaultPageContainer";
import Header from "../ui/Header";

function Posts(): ReactElement {
  return (
    <DefaultPageContainer>
      <Header />
      POSTS
    </DefaultPageContainer>
  );
}

export default Posts;
