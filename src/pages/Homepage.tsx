import HeroSection from "../ui/HeroSection";
import FeaturedPost from "../ui/FeaturedPost";
import Subscribe from "../ui/Subscribe";
import Footer from "../ui/Footer";
import { ReactElement } from "react";
import DefaultPageContainer from "../ui/DefaultPageContainer";
import Header from "../ui/Header";

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
