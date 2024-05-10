import axios from "axios";
// export type ArticleType = {
//   avatar: string;
//   content: string;
//   created_at: Date;
//   id: number;
//   readingTime: number;
//   summary: string;
//   title: string;
//   topic: string;
// };

export type ArticleType = {
  _id: string;
  authorId: string;
  title: string;
  content: string;
  created_at: Date;
  readingTime: number;
  avatar: string;
  summary: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
};
type GetArticleResponse = {
  status: "success";
  results: number;
  data: {
    data: ArticleType[];
  };
};

async function getArticles() {
  const articleResponse = await axios.get<GetArticleResponse>(
    "http://localhost:3000/api/v1/articles",
  );

  return articleResponse.data;
}

export { getArticles };
