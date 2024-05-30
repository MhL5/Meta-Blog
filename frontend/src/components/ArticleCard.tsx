import { Article } from "@/hooks/useGetArticles";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { convertToCamelCase } from "@/utils/convertToCamelCase";
import { NavLink } from "react-router-dom";
import {
  ChatBubbleIcon,
  StopwatchIcon,
  EyeOpenIcon,
  HeartIcon,
} from "@radix-ui/react-icons";
import RenderMarkDown from "@/features/articles/RenderMarkDown";
import { truncateText } from "@/utils/truncateText";
import UserAvatar from "./ui/UserAvatar";

type ArticleCardProps = { article: Article };

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="custom-hover m-auto flex h-full max-w-[400px] cursor-pointer">
      <article>
        <NavLink
          to={`/articles/${article._id}`}
          className="flex h-full flex-col"
        >
          <CardHeader>
            <div>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${article.avatar}`}
                className="h-80 w-full  rounded-xl object-cover"
              />
            </div>
            <div className="pt-2">
              <Badge variant={`${convertToCamelCase(article.tags[0])}`}>
                {article.tags[0]}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="">
            <CardTitle className="pb-2 text-xl font-bold">
              {article.title}
            </CardTitle>
            <p>
              <RenderMarkDown data={truncateText(article.summary, 150)} />
            </p>
          </CardContent>

          <CardFooter className="mt-auto">
            <CardDescription className="w-full">
              <span className="flex items-center justify-start space-x-2 pb-3">
                <span>
                  <UserAvatar
                    className="h-6 w-6 cursor-pointer"
                    url={article.authorId.avatar}
                    fallBackText=""
                  />
                </span>
                <span> {article.authorId?.fullName} </span>
              </span>

              <span className="flex items-center justify-between">
                {[
                  {
                    icon: <HeartIcon />,
                    text: `${article.articleLikes.length}`,
                  },
                  {
                    icon: <EyeOpenIcon />,
                    text: `${article.articleLikes.length}`,
                  },
                  {
                    icon: <ChatBubbleIcon />,
                    text: `${article.articleComments.length}`,
                  },
                  {
                    icon: <StopwatchIcon />,
                    text: `${article.readingTime} minutes`,
                  },
                ].map(({ icon, text }) => {
                  return (
                    <span
                      key={`${Math.random()}${icon + text}`}
                      className="flex items-center gap-2"
                    >
                      {icon} {text}
                    </span>
                  );
                })}
              </span>
            </CardDescription>
          </CardFooter>
        </NavLink>
      </article>
    </Card>
  );
}
