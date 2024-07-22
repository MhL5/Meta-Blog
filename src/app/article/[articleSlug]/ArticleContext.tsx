"use client";

import { createContext, PropsWithChildren, useContext } from "react";
import { getArticle } from "./page";

type ArticleContextProviderProps = PropsWithChildren<{
  article: Awaited<ReturnType<typeof getArticle>>;
  loggedInUserSession: {
    id: string;
    name: string;
    image: string;
  } | null;
}>;
type ArticleContextType = {
  article: Awaited<ReturnType<typeof getArticle>>;
  loggedInUserSession: {
    id: string;
    name: string;
    image: string;
  } | null;
};

const ArticleContext = createContext<null | ArticleContextType>(null);

export default function ArticleContextProvider({
  children,
  article,
  loggedInUserSession,
}: ArticleContextProviderProps) {
  return (
    <ArticleContext.Provider value={{ article, loggedInUserSession }}>
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
