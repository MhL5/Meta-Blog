import EmailSubscribe from "../ui/EmailSubscribe";
import sectionImg from "../assets/section-img.jpg";
import TextGradient from "./TextGradient";
import Button from "./Button";
import TotalMemberCard from "./TotalMemberCard";

// TODO: RESPONSIVE
function HeroSection(): JSX.Element {
  return (
    <section className="m-auto mt-4 max-w-globalWidthContent gap-8 p-8 lg:flex lg:justify-center">
      <div className="flex flex-col items-center justify-center xl:basis-2/3 xl:items-start xl:justify-start">
        <h1 className="mb-4 text-center text-4xl font-bold leading-snug sm:text-6xl lg:mb-0 lg:mt-4 xl:my-8 xl:text-start">
          Hello 👋, we are Meta Blog, exploring
          <TextGradient> fashion</TextGradient>,
          <TextGradient> lifestyle</TextGradient>, and
          <TextGradient> health</TextGradient>.
        </h1>

        <p className="my-auto mb-10 mt-4 text-center text-lg sm:mt-14 sm:w-[65ch] sm:text-lg lg:w-[60ch] lg:text-xl xl:mt-8 xl:text-start">
          Where Reading & Writing Collide, Your Blogging Journey Begins. Write
          with Passion, Read with Purpose:{" "}
          <span className="font-bold">
            {" "}
            Discover Your Blogging Voice with Meta Blog.
          </span>
        </p>

        <div className="flex w-full justify-center sm:justify-start md:justify-center xl:justify-start">
          <EmailSubscribe className="mx-auto mt-8 lg:mx-0 " />
          <Button variant="primary" className="text-xl sm:hidden">
            Join Now, It's free!
          </Button>
        </div>
      </div>

      <div className="relative hidden rounded-xl xl:block xl:basis-1/3">
        <img className="rounded-xl" loading="lazy" src={sectionImg} alt="" />
        <TotalMemberCard className="animate-translateY absolute bottom-[-5%] left-[-10%] transition" />
      </div>
    </section>
  );
}

export default HeroSection;
