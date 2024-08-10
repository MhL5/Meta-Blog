import { Categories } from "@prisma/client";
import CloudinaryImage from "./CloudinaryImage";
import CategoryBadge from "./ui/categoryBadge";
import GradientBorder from "./ui/GradientBorder";

type MiniCardProps = {
  article: {
    title: string;
    readingTime: string;
    avatar: string;
    category: keyof typeof Categories;
  };
};

export default function MiniCard({ article }: MiniCardProps) {
  return (
    <GradientBorder className="h-full w-full rounded-lg border">
      <div className="max-w-xs space-y-4 p-3">
        <div className="relative aspect-square max-h-80">
          <CloudinaryImage
            src={article.avatar}
            alt="article image"
            fill
            sizes="200"
            className="w-full rounded-lg object-cover"
          />
        </div>

        <div className="mt-2">
          <CategoryBadge variant={article.category}>{article.category}</CategoryBadge>
        </div>
        <div className="pb-4 font-bold">{article.title}</div>
        <div className="text-xs"> {article.readingTime} min read </div>
      </div>
    </GradientBorder>
  );
}
