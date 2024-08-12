import { Suspense } from "react";
import CarouselHomepage from "@/app/_homepage/CarouselHomepage";
import { getTopFourArticles } from "@/app/_homepage/services";
import CarouselHomepageSkeletion from "./CarouselHomepageSkeletion";

export default function TopFourArticlesCarousel() {
  return (
    <>
      <h2 className="mb-8 text-center text-3xl font-bold">
        Most Popular Blogs
      </h2>
      <Suspense
        fallback={
          <CarouselHomepageSkeletion numCarouselHomepageSkeletion={3} />
        }
      >
        <CarouselHomepageWrapper />
      </Suspense>
    </>
  );
}

// in order for suspense to work we need a wrapper function
async function CarouselHomepageWrapper() {
  const topFourArticles = await getTopFourArticles();
  await new Promise((res) => setTimeout(res, 7000));

  return <CarouselHomepage articles={topFourArticles} />;
}
