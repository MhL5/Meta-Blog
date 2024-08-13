import { Skeleton } from "@/components/ui/skeletion";

type CarouselHomepageSkeletionProps = {
  numCarouselHomepageSkeletion: number;
};

export default function CarouselHomepageSkeletion({
  numCarouselHomepageSkeletion,
}: CarouselHomepageSkeletionProps) {
  return (
    <ul className="grid h-[500px] grid-cols-3 items-center gap-4">
      {Array.from({ length: numCarouselHomepageSkeletion }).map((_, i) => {
        return (
          <Skeleton
            key={`carousel-homepage-skeletion-${i}`}
            className="flex h-full w-full flex-col items-start justify-end gap-2 rounded-lg bg-gray-300 p-4"
          >
            <Skeleton className="h-4 w-[30%]" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[20%]" />
          </Skeleton>
        );
      })}
    </ul>
  );
}
