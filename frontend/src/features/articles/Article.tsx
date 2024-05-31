import Spinner from "@/components/ui/Spinner";
import { Badge } from "@/components/ui/badge";
import { Tag } from "@/hooks/useGetArticles";
import { axiosApi } from "@/services/axiosApi";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import UserAvatar from "@/components/ui/UserAvatar";
import { dateConvertor } from "@/utils/dateConvertor";
import { CalendarIcon, HeartIcon, StopwatchIcon } from "@radix-ui/react-icons";
import RenderMarkDown from "./RenderMarkDown";
import CommentManager from "./comments/CommentManager";

export type ArticleComment = {
  _id: string;
  userId: {
    _id: string;
    fullName: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
  };
  articleId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type ArticleComments = ArticleComment[];

type ArticleData = {
  _id: string;
  authorId: {
    _id: string;
    fullName: string;
    avatar: string;
  };
  title: string;
  content: string;
  readingTime: number;
  avatar: string;
  summary: string;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
  articleComments: ArticleComments;
  articleLikes: {
    _id: string;
    userId: string;
    articleId: string;
    createdAt: string;
    updatedAt: string;
  }[];
  articleViews: {
    _id: string;
    articleId: string;
    createdAt: string;
  }[];
  id: string;
};
type ArticleResponse = {
  status: "success" | "fail";
  data: ArticleData;
};

export default function Article() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["article", id],
    queryFn: async () => {
      const res = await axiosApi.get<ArticleResponse>(`articles/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="m-40 grid place-items-center">
        Loading...
        <Spinner className="h-12 w-12" />
      </div>
    );
  }

  if (!data)
    return <div className="m-40 grid place-items-center">404 Not found 😥</div>;

  return (
    <section className="m-10 max-w-[700px]">
      <div className="flex">
        {data.data.tags.map((tag) => {
          return (
            <Badge key={Math.random() + tag} variant={tag} className="mr-auto">
              {tag}
            </Badge>
          );
        })}

        <div className="ml-auto flex items-center gap-4 rounded-full border px-4 py-2 font-bold shadow-sm">
          {data.data.articleLikes.length}
          {/* todo: activate liking */}
          <HeartIcon className="h-6 w-6" />
          {/* <HeartFilledIcon /> */}
        </div>
      </div>

      <h1 className="py-8 text-5xl font-bold">{data.data.title}</h1>

      <summary>
        <RenderMarkDown data={data.data.summary} />
      </summary>

      <div className="flex items-center gap-6 pt-8">
        <Link
          className="flex items-center gap-2 font-bold capitalize underline hover:text-blue-500"
          to={`/authors/${data.data.authorId._id}`}
        >
          <UserAvatar url={`${data.data.authorId.avatar}`} />
          {data.data.authorId.fullName}
        </Link>

        <div className="flex items-center gap-2">
          <span>
            <CalendarIcon />
          </span>
          <span>{dateConvertor(data.data.createdAt)}</span>
        </div>

        <div className="flex items-center gap-2">
          <span>
            <StopwatchIcon />
          </span>
          {data.data.readingTime} min read
        </div>
      </div>

      <div className="py-8">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/${data.data.avatar}`}
          alt="article image"
          className="max-h-[400px] w-full rounded-md object-cover"
        />
      </div>

      <RenderMarkDown data={data.data.content} />

      <div className="mt-16 rounded-md">
        <CommentManager comments={data.data.articleComments} />
      </div>
    </section>
  );
}
