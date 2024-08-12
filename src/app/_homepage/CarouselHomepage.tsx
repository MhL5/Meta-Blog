"use client";

import GradientUnderlineText from "@/components/ui/GradientUnderlineText";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CategoryBadge from "@/components/ui/categoryBadge";
import { Article } from "@prisma/client";
import Autoplay from "embla-carousel-autoplay";
import { Clock } from "lucide-react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

type CarouselHomepageProps = {
  articles: Article[];
};

export default function CarouselHomepage({ articles }: CarouselHomepageProps) {
  return (
    <Carousel
      className="mx-auto w-full max-w-7xl"
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent className="gird h-[500px] items-center">
        {articles.map((article, index) => {
          return (
            <CarouselItem key={index} className="h-full w-full basis-1/3">
              <Link
                href={`/article/${article.slug}`}
                className="stackContent || relative h-full rounded-lg border"
              >
                <div className="relative h-full w-full">
                  <CldImage
                    fill
                    src={article.avatar}
                    alt="article avatar"
                    className="-z-50 h-full w-full rounded-lg object-cover"
                  />
                </div>

                <div className="relative z-10 m-10 text-lg font-bold text-white">
                  <div>
                    <CategoryBadge variant={article.category}>
                      {article.category}
                    </CategoryBadge>
                  </div>
                  <GradientUnderlineText>{article.title}</GradientUnderlineText>
                  <div className="mt-2 text-sm">
                    <Clock className="mr-2 inline-block h-4 w-4" />
                    <span>{article.readingTime} min read</span>
                  </div>
                </div>

                <div className="overlay"></div>
              </Link>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

