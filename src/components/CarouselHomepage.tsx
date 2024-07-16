"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CldImage } from "next-cloudinary";

export default function CarouselHomepage() {
  // TODO : SHOULD BE A LINK
  // fix stuff bottom
  return (
    <Carousel
      className="mx-auto w-full max-w-7xl"
      opts={{ loop: true, startIndex: 1 }}
    >
      <CarouselContent className="gird h-[500px] items-center">
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <CarouselItem key={index} className="basis-2/3">
              <div className="px-3 py-4">
                <Card className="hover:-translate-y-0">
                  <CardContent className="relative m-0 flex aspect-video items-center justify-center p-0">
                    <div className="stackContent || relative h-full w-full">
                      <CldImage
                        fill
                        // todo:
                        src="https://res.cloudinary.com/dkyoa6any/image/upload/v1720380054/git_zvgh9i.jpg"
                        alt="test"
                        className="h-full w-full rounded-lg object-cover"
                      />
                      <div className="m-10 text-xl font-bold text-white">
                        <div>BADGE</div>
                        <div>TITLE</div>
                        <div>WRITER AVATAR | READING TIME </div>
                      </div>
                    </div>
                    <div className="overlay"></div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
