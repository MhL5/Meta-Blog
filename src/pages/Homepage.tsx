import NavigationMenu from "../ui/NavigationMenu";
import HeroSection from "../ui/HeroSection";
import FeaturedPost from "../ui/FeaturedPost";
import Subscribe from "../ui/Subscribe";
import Footer from "../ui/Footer";

function Homepage(): JSX.Element {
  return (
    <>
      <div className="min-h-dvh">
        <div className="svg-pattern-background ||| min-h-dvh">
          <header>
            <NavigationMenu />
          </header>

          <HeroSection />
        </div>

        <FeaturedPost />

        <div className="lg:mx-12 lg:my-14">
          <Subscribe />
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Homepage;
