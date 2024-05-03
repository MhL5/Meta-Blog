import EmailSubscribe from "../form/EmailSubscribe";
import TextGradient from "../elements/textGradient/TextGradient";
import Button from "../elements/button/Button";
import TotalMemberCard from "../elements/cards/TotalMemberCard";
import { ReactElement } from "react";
import Img from "../elements/image/Img";

type HeroSectionProps = {
  className?: string;
};

function HeroSection({ className }: HeroSectionProps): ReactElement {
  return (
    <section
      className={`${className} m-auto max-w-globalWidthContent gap-8 p-8 lg:flex lg:justify-center`}
    >
      <div className="flex flex-col items-center justify-center xl:basis-2/3 xl:items-start xl:justify-start">
        <h1 className="mb-4 text-center text-4xl font-bold leading-snug sm:text-6xl lg:mb-0 lg:mt-4 xl:my-8 xl:text-start">
          Hello 👋, we are Meta Blog, exploring
          <TextGradient> fashion</TextGradient>,
          <TextGradient> lifestyle</TextGradient>, and
          <TextGradient> health</TextGradient>.
        </h1>

        <p className="my-auto mb-10 mt-4 text-center text-lg sm:mt-14 sm:text-lg md:w-[65ch] lg:w-[60ch] lg:text-xl xl:mt-8 xl:text-start">
          Where Reading & Writing Collide, Your Blogging Journey Begins. Write
          with Passion, Read with Purpose:{" "}
          <span className="font-bold">
            {" "}
            Discover Your Blogging Voice with Meta Blog.
          </span>
        </p>

        <div className="flex w-full justify-center sm:justify-start md:justify-center xl:justify-start">
          <EmailSubscribe className="mx-auto mt-8 lg:mx-0 " />
          <Button variant="primary" className="text-xl sm:hidden" el="button">
            Join Now, It's free!
          </Button>
        </div>
      </div>

      <div className="relative hidden rounded-xl xl:block xl:basis-1/3">
        <Img
          className="rounded-xl"
          loading="lazy"
          src="https://wszdqegvivbzymvxyvlx.supabase.co/storage/v1/object/public/homepage/section-img.jpg?t=2024-03-10T15%3A15%3A55.456Z"
          alt=""
        />
        <TotalMemberCard className="absolute bottom-[-5%] left-[-10%] animate-upAndDown transition" />
      </div>
    </section>
  );
}

export default HeroSection;
