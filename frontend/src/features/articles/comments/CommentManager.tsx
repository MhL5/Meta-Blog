import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { ArticleComments } from "../Article";
import { useAuthContext } from "@/features/authentication/AuthContext";
import Comment from "./Comment";
import AddComment from "./AddComments";
import { useCreateComment } from "./useCreateComment";

type CommentManagerProps = {
  comments: ArticleComments;
};

export default function CommentManager({ comments }: CommentManagerProps) {
  const { auth } = useAuthContext();
  const { createComment, isCreating, variables } = useCreateComment();
  const user = auth?.data.user;
  let loggedInUserId = null;
  if (auth?.data.user._id) loggedInUserId = auth?.data.user._id;
  
  return (
    <>
      <div className="mb-4 flex items-center gap-4 border-b-4 p-2 text-2xl font-bold">
        <span>
          <ChatBubbleIcon />
        </span>
        Comments
      </div>

      <div className="space-y-2">
        {comments.map((comment) => {
          return (
            <Comment
              comment={comment}
              loggedInUserId={loggedInUserId || ""}
              key={comment._id}
            />
          );
        })}
        {isCreating && variables && user && (
          <Comment
            comment={{
              createdAt: `${new Date()}`,
              updatedAt: `${new Date()}`,
              _id: `Temp optimistic comment id ${variables.content}`,
              ...variables,
              userId: user,
            }}
            loggedInUserId={loggedInUserId || ""}
            key={variables.toString()}
          />
        )}
      </div>

      <div className="my-3">
        <AddComment
          createComment={createComment}
          isCreating={isCreating}
          articleId={comments[0].articleId || "56615156156516156516156516"}
        />
      </div>
    </>
  );
}
