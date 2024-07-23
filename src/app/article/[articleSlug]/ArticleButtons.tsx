import { Button } from "@/components/ui/button";
import { Bookmark, Heart, MessageCircleMore, Share2 } from "lucide-react";
import Link from "next/link";

/*
Lets go bitches: Optimistic like with an animation
Save: Optimistic save with bg color change smooth animation for changing bg
Share: idk lets investigate, if its too much work will go with a simple url copy clipboard
*/
export default function ArticleButtons() {
  return (
    <>
      <section className="sticky bottom-[5%] z-20 my-8 flex items-center justify-center text-lg">
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
