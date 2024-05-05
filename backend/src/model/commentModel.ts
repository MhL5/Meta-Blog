import { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    //  userId
    //  articleId
    body: {
      type: String,
      required: [true, "a comment must include content"],
      maxLength: [2000, "Comment is too big"],
    },
  },
  { timestamps: true }
);
