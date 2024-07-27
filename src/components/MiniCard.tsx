import CloudinaryImage from "./CloudinaryImage";
import GradientBorder from "./ui/GradientBorder";

type MiniCardProps = {
  article: {
    title: string;
    readingTime: string;
    avatar: string;
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
        <div className="text-xs"> {article.readingTime} min read </div>
        <div className="pb-4 font-bold">{article.title}</div>
      </div>
    </GradientBorder>
  );
}
