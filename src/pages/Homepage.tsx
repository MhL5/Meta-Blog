import NavigationMenu from "../ui/NavigationMenu";
import HeroSection from "../ui/HeroSection";
import FeaturedPost from "../ui/FeaturedPost";

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
      </div>
    </>
  );
}

export default Homepage;
