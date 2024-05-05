import { InferSchemaType, Schema, model } from "mongoose";

type View = InferSchemaType<typeof articleViewSchema>;

const articleViewSchema = new Schema({
  articleId: {
    type: Schema.Types.ObjectId,
    ref: "Article",
    required: true,
  },
  ipAddress: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure each IP address can only count once per article per day
articleViewSchema.index(
  { articleId: 1, ipAddress: 1, createdAt: 1 },
  { unique: true }
);

const ArticleViewModel = model<View>("ArticleView", articleViewSchema);

export { ArticleViewModel };
