import NavigationMenu from "../ui/NavigationMenu";
import HeroSection from "../ui/HeroSection";
import FeaturedPost from "../ui/FeaturedPost";
import Subscribe from "../ui/Subscribe";
import Footer from "../ui/Footer";
import { ReactElement } from "react";
import DefaultPageContainer from "../ui/DefaultPageContainer";

function Homepage(): ReactElement {
  return (
    <DefaultPageContainer>
      <header className="sticky top-0 z-50 bg-bodyBackgroundColor/70 backdrop-blur-md">
        <NavigationMenu />
      </header>

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
