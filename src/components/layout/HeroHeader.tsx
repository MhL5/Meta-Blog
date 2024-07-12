import TextGradient from "@/components/ui/textGradient";
import GradientBorder from "@/components/ui/GradientBorder";
import Link from "next/link";

export default function HeroHeader() {
  return (
    <section className={`max-w-globalWidthContent m-auto p-8`}>
      <div>
        <h1 className="mt-10 text-center text-3xl font-bold leading-relaxed sm:text-6xl">
          Hello 👋, We are Meta Blog,
          <TextGradient> dive Into the World of Code </TextGradient>
        </h1>
      </div>

      <p className="m-6 text-center text-lg font-semibold leading-relaxed">
        Discover the latest programming tutorials, tips, and insights to elevate
        your coding skills. Whether you&apos;re{" "}
        <span className="font-extrabold">
          a beginner or a seasoned developer
        </span>
        , join our community and stay ahead in the ever-evolving world of
        technology.
      </p>

      <div className="mt-12 flex justify-center">
        <GradientBorder className="rounded-lg border">
          <Link
            href="/auth?tab=signup"
            className="inline-block px-8 py-4 text-lg font-bold"
          >
            Join now, It&apos;s free!
          </Link>
        </GradientBorder>
      </div>
    </section>
  );
}
