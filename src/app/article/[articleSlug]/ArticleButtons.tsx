import { Button } from "@/components/ui/button";
import { Bookmark, Heart, MessageCircleMore, Share2 } from "lucide-react";
import Link from "next/link";

export default function ArticleButtons() {
  return (
    <>
      <section className="sticky bottom-[5%] my-8 flex items-center justify-center text-lg">
        <Button
          variant="outline"
          size="lg"
          className="rounded-none rounded-bl-lg rounded-tl-lg transition-all duration-300 hover:px-12"
        >
          <span className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
          </span>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="rounded-none transition-all duration-300 hover:px-12"
          asChild
        >
          <Link href="#comments-section">
            <span className="flex items-center gap-2">
              <MessageCircleMore className="h-4 w-4" />
            </span>
          </Link>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="rounded-none transition-all duration-300 hover:px-12"
        >
          <span className="flex items-center gap-2">
            <Bookmark className="h-4 w-4" />
          </span>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="rounded-none rounded-br-lg rounded-tr-lg transition-all duration-300 hover:px-12"
        >
          <span className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
          </span>
        </Button>
      </section>
    </>
  );
}
