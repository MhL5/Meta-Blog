import Spinner from "@/components/ui/Spinner";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from "react-router-dom";
import UserAvatar from "@/components/ui/UserAvatar";
import { dateConvertor } from "@/utils/dateConvertor";
import { CalendarIcon, StopwatchIcon } from "@radix-ui/react-icons";
import RenderMarkDown from "./RenderMarkDown";
import CommentManager from "./comments/CommentManager";
import ArticleLike from "./like/ArticleLike";
import useGetArticle from "@/hooks/useGetArticle";
import NotFoundPage from "@/pages/NotFoundPage";



export default function Article() {
  const { id } = useParams();
  const { article, isLoading } = useGetArticle({ articleId: id || "" });

  if (isLoading) {
    return (
      <div className="m-40 grid place-items-center">
        Loading...
        <Spinner className="h-12 w-12" />
      </div>
    );
  }

  if (!article || !id) return <NotFoundPage />;

  return (
    <section className="m-10 mx-4 sm:m-10 max-w-[700px]">
      <div className="pb-2">
        {article.data.tags.map((tag) => {
          return (
            <Badge key={Math.random() + tag} variant={tag} className="mr-auto">
              {tag}
            </Badge>
          );
        })}
      </div>

      <h1 className="py-8 text-5xl font-bold">{article.data.title}</h1>

      <summary>
        <RenderMarkDown data={article.data.summary} />
      </summary>

      <div className="flex items-center flex-wrap gap-6 pt-8">
        <Link
          className="flex items-center gap-2 font-bold capitalize underline hover:text-blue-500"
          to={`/authors/${article.data.authorId._id}`}
        >
          <UserAvatar url={`${article.data.authorId.avatar}`} />
          {article.data.authorId.fullName}
        </Link>

        <div className="flex items-center gap-2">
          <span>
            <CalendarIcon />
          </span>
          <span>{dateConvertor(article.data.createdAt)}</span>
        </div>

        <div className="flex items-center gap-2">
          <span>
            <StopwatchIcon />
          </span>
          {article.data.readingTime} min read
        </div>

        <ArticleLike articleLikes={article.data.articleLikes} articleId={id} />
      </div>

      <div className="py-8">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/${article.data.avatar}`}
          alt="article image"
          className="max-h-[400px] w-full rounded-md object-cover"
          loading="lazy"
        />
      </div>

      <RenderMarkDown data={article.data.content} />

      <div className="mt-16 rounded-md">
        <CommentManager comments={article.data.articleComments} />
      </div>
    </section>
  );
}
