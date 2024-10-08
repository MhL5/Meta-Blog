"use client";

import SmartImage from "@/components/SmartImage";
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
import Link from "next/link";

type CarouselHomepageProps = {
  articles: Article[];
};

export default function CarouselHomepage({ articles }: CarouselHomepageProps) {
  return (
    <Carousel
      className="mx-auto w-full max-w-7xl px-4 lg:px-1"
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
      <CarouselContent className="gird h-[400px] items-center sm:h-[500px]">
        {articles.map((article, index) => {
          return (
            <CarouselItem
              key={index}
              className="h-full basis-full sm:basis-2/4 lg:basis-1/3"
            >
              <Link
                href={`/article/${article.slug}`}
                className="stackContent || relative h-full rounded-lg border"
              >
                <div className="relative h-full w-full">
                  <SmartImage
                    as={`${article.avatar.startsWith("https://res.cloudinary.com") ? "cloudinaryImage" : "nextImage"}`}
                    fill
                    src={article.avatar}
                    alt="article avatar"
                    className="-z-50 h-full w-full rounded-lg object-cover"
                  />
                </div>

                <div className="relative z-10 m-10 text-lg font-bold text-white">
                  <div>
                    <CategoryBadge as="span" variant={article.category}>
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
      <CarouselPrevious className="hidden xl:flex" />
      <CarouselNext className="hidden xl:flex" />
    </Carousel>
  );
}
