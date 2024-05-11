import HeroSection from "../components/layout/HeroSection";
import FeaturedPost from "../components/elements/cards/FeaturedPost";
import Subscribe from "../components/form/Subscribe";
import Footer from "../components/layout/Footer";
import { ReactElement } from "react";
import DefaultPageContainer from "../components/layout/DefaultPageContainer";
import Header from "../components/layout/Header";

function Homepage(): ReactElement {
  return (
    <DefaultPageContainer>
      <Header />

      <div className="mb-24 flex h-[90dvh] flex-col">
        <HeroSection />
      </div>

      <FeaturedPost />

      <div className="lg:mx-12 lg:my-14">
        <Subscribe />
      </div>

      <Footer />
    </DefaultPageContainer>
  );
}

export default Homepage;
