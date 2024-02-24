import CircleFadeSvg from "../ui/CircleFadeSvg";
import CircleSvg from "../ui/CirclesSvg";
import GradientFrameSvg from "../ui/GradientFrameSvg";
import NavigationMenu from "../ui/NavigationMenu";

// TODO: replace the hard coded values for svg with css variables
function Homepage(): JSX.Element {
  return (
    <div className="isolate grid">
      <div className="-z-50 col-span-full row-span-full overflow-hidden">
        <GradientFrameSvg />
        <CircleSvg />
        <CircleFadeSvg />
      </div>
      <div className="col-span-full row-span-full  text-xl">
        <header>
          <NavigationMenu />
        </header>
        <main>im main 😁</main>
      </div>
    </div>
  );
}

export default Homepage;
