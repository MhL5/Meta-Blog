"use client";

import { createContext, PropsWithChildren, useContext } from "react";
import { getArticle } from "./page";

type ArticleContextProviderProps = PropsWithChildren<{
  article: Awaited<ReturnType<typeof getArticle>>;
  curUserId: string;
}>;
type ArticleContextType = {
  article: Awaited<ReturnType<typeof getArticle>>;
  curUserId: string;
};

const ArticleContext = createContext<null | ArticleContextType>(null);

export default function ArticleContextProvider({
  children,
  article,
  curUserId,
}: ArticleContextProviderProps) {
  return (
    <ArticleContext.Provider value={{ article, curUserId }}>
      {children}
    </ArticleContext.Provider>
  );
}

export function useArticleContext() {
  const context = useContext(ArticleContext);
  if (!context)
    throw new Error(
      "ArticleCommentContext Context was called outside of its provider.",
    );
  return context;
}


/*
 // const articleCommentsList = articleComments.map(
  //   (comment): CreateCommentSchema => {
  //     const { image: authorImage, name: authorName } = comment.user;
  //     const {
  //       id,
  //       content,
  //       userId: authorId,
  //       createdAt,
  //       updatedAt,
  //       articleId,
  //     } = comment;

  //     return {
  //       id,
  //       content,
  //       authorId,
  //       authorName: authorName || "",
  //       authorImage: authorImage || "",
  //       articleId,
  //       articleSlug: slug,
  //       createdAt,
  //       updatedAt,
  //     };
  //   },
  // );
*/