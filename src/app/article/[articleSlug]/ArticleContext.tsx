"use client";

import { useToast } from "@/components/ui/use-toast";
import { Prisma } from "@prisma/client";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useOptimistic,
  useTransition,
} from "react";
import { createComment, deleteComment, updateComment } from "./actions";
import {
  CreateCommentSchema,
  DeleteCommentSchema,
  UpdateCommentSchema,
} from "./schema";

// Types
// -----------------------------------------------
// -----------------------------------------------
type FullArticleData = Prisma.ArticleGetPayload<{
  include: {
    articleComments: {
      include: { user: { select: { id: true; name: true; image: true } } };
    };
    author: true;
    articleLikes: true;
    favoriteArticle: true;
  };
}>;

type LoggedInUserSession = {
  id: string;
  name: string;
  image: string;
} | null;

type ArticleContextProviderProps = PropsWithChildren<{
  article: FullArticleData;
  loggedInUserSession: LoggedInUserSession;
}>;

type ArticleContextType = {
  article: FullArticleData;
  loggedInUserSession: LoggedInUserSession;
  articleCommentsOptimistic: {
    optimisticComments: FullArticleData["articleComments"];
    pendingOptimisticComment: boolean;
    addOptimisticComment: (values: CreateCommentSchema) => Promise<void>;
    updateOptimisticComment: (values: UpdateCommentSchema) => Promise<void>;
    deleteOptimisticComment: (values: DeleteCommentSchema) => Promise<void>;
  };
};

type OptimisticCommentsReducerActions =
  | {
      type: "ADD";
      payload: CreateCommentSchema & {
        loggedInUserSession: { id: string; name: string; image: string };
      };
    }
  | { type: "DELETE"; payload: DeleteCommentSchema }
  | { type: "UPDATE"; payload: UpdateCommentSchema };
// -----------------------------------------------
// -----------------------------------------------

const ArticleContext = createContext<null | ArticleContextType>(null);

function optimisticCommentsReducer(
  state: FullArticleData["articleComments"],
  action: OptimisticCommentsReducerActions,
) {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          ...action.payload,
          id: `${Math.random()}}`,
          userId: action.payload.loggedInUserSession.id,
          user: { ...action.payload.loggedInUserSession },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
    case "UPDATE":
      return state.map((comment) => {
        if (comment.id === action.payload.commentId)
          return {
            ...comment,
            content: action.payload.content,
          };
        return comment;
      });
    case "DELETE":
      return state.filter((comment) => comment.id !== action.payload.commentId);
    default:
      return state;
  }
}

export default function ArticleContextProvider({
  children,
  article,
  loggedInUserSession,
}: ArticleContextProviderProps) {
  const articleComments = article.articleComments;
  const [optimisticComments, dispatch] = useOptimistic(
    articleComments,
    optimisticCommentsReducer,
  );
  const [pendingOptimisticComment, startTransition] = useTransition();
  const { toast } = useToast();
  const errorToast = (error: unknown) =>
    toast({
      variant: "destructive",
      title: "Error, Something went wrong!",
      description: `${error instanceof Error ? error.message : error}`,
    });

  async function addOptimisticComment(values: CreateCommentSchema) {
    try {
      if (!loggedInUserSession) return;
      startTransition(async () => {
        dispatch({
          type: "ADD",
          payload: {
            ...values,
            loggedInUserSession,
          },
        });
        await createComment(values);
      });
    } catch (error) {
      errorToast(error);
    }
  }

  async function updateOptimisticComment(values: UpdateCommentSchema) {
    try {
      if (!loggedInUserSession) return;
      startTransition(async () => {
        dispatch({ type: "UPDATE", payload: { ...values } });
        await updateComment(values);
      });
    } catch (error) {
      errorToast(error);
    }
  }

  async function deleteOptimisticComment(values: DeleteCommentSchema) {
    try {
      if (!loggedInUserSession) return;
      startTransition(async () => {
        dispatch({ type: "DELETE", payload: { ...values } });
        await deleteComment(values);
      });
    } catch (error) {
      errorToast(error);
    }
  }

  return (
    <ArticleContext.Provider
      value={{
        articleCommentsOptimistic: {
          addOptimisticComment,
          updateOptimisticComment,
          deleteOptimisticComment,
          pendingOptimisticComment,
          optimisticComments,
        },
        article,
        loggedInUserSession,
      }}
    >
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
