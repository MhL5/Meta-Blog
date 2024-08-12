import { BorderBeam } from "@/components/ui/borderBeam";
import { TextEffect } from "@/components/ui/textEffect";
import TextGradient from "@/components/ui/textGradient";
import Link from "next/link";

export default function HeroHeader() {
  return (
    <section
      className={`m-auto grid min-h-[80dvh] max-w-7xl place-items-center px-1 lg:p-8`}
    >
      <div>
        <h1 className="text-pretty text-center text-5xl font-bold leading-snug sm:text-6xl lg:mt-10">
          <TextGradient> dive Into the World of Code </TextGradient>
        </h1>

        <TextEffect
          per="char"
          preset="fade"
          className="m-6 max-w-4xl text-center text-lg font-semibold leading-relaxed"
        >
          Discover the latest programming tutorials, tips, and insights to
          elevate your coding skills. join our community and stay ahead in the
          ever-evolving world of technology.
        </TextEffect>

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
