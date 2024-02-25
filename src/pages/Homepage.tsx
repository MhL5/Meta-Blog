import NavigationMenu from "../ui/NavigationMenu";
import HeroSection from "../ui/HeroSection";

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

        <div className="mt-[1000px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni sit
          consectetur quibusdam atque, earum magnam quisquam veritatis impedit
          consequuntur quos illo id voluptates in vitae. Voluptatibus voluptate
          quo optio repellendus tenetur ipsam facilis, rem sed illo quae!
          Architecto excepturi earum iste dolorem quibusdam qui in aliquid
          tenetur numquam aperiam non doloremque inventore, quasi, ipsam atque
          minima labore repellendus? Quos hic fuga in a vitae doloremque
          dignissimos, provident esse optio reprehenderit odio quasi deserunt
          consequatur cupiditate officia voluptas neque tempore saepe harum
          rerum. Corporis sed nostrum enim asperiores eos suscipit labore
          tempore, similique ex fuga sit necessitatibus quos quam ratione earum.
          H
        </div>
      </div>
    </>
  );
}

export default Homepage;
