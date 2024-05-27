import { Link } from "react-router-dom";
import TextGradient from "../TextGradient";
import { Button } from "../ui/button";

type HeroSectionProps = {
  className?: string;
};

export default function HomePageHeroHeader({ className }: HeroSectionProps) {
  return (
    <section className={`${className} m-auto max-w-globalWidthContent p-8`}>
      <div>
        <h1 className="mt-20 text-center text-4xl font-bold leading-snug sm:text-6xl">
          Hello 👋, we are Meta Blog, exploring
          <TextGradient> fashion</TextGradient>,
          <TextGradient> lifestyle</TextGradient>, and
          <TextGradient> health</TextGradient>.
        </h1>
      </div>

      <p className="m-8 mt-10 text-balance text-center text-xl text-primary/90">
        Where Reading & Writing Collide, Your Blogging Journey Begins. Write
        with Passion, Read with Purpose :
        <br />
        <span className="font-bold">
          {" "}
          Discover Your Blogging Voice with Meta Blog.
        </span>
      </p>

      <div className="mt-12 flex ">
        <Button className="m-auto px-6 py-7 text-2xl" variant="outline" size="lg" asChild>
          <Link to="/signup?tab=signup">Join now, It's free!</Link>
        </Button>
      </div>
    </section>
  );
}
