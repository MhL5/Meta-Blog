import TextGradient from "@/components/ui/textGradient";
import Link from "next/link";
import { BorderBeam } from "../ui/borderBeam";

export default function HeroHeader() {
  return (
    <section
      className={`max-w-globalWidthContent m-auto grid min-h-[80dvh] place-items-center p-8`}
    >
      <div>
        <div>
          <h1 className="mt-10 text-center text-3xl font-bold leading-relaxed sm:text-6xl">
            Hello 👋, We are Meta Blog,
            <TextGradient> dive Into the World of Code </TextGradient>
          </h1>
        </div>

        <p className="m-6 text-center text-lg font-semibold leading-relaxed">
          Discover the latest programming tutorials, tips, and insights to
          elevate your coding skills. Whether you&apos;re{" "}
          <span className="font-extrabold">
            a beginner or a seasoned developer
          </span>
          , join our community and stay ahead in the ever-evolving world of
          technology.
        </p>

        <div className="mt-12 flex justify-center">
          <Link
            href="/auth?tab=signup"
            className="custom-hover || relative inline-block rounded-full border px-8 py-4 text-lg font-bold"
          >
            <BorderBeam duration={5} />
            Join now, It&apos;s free!
          </Link>
        </div>
      </div>
    </section>
  );
}
