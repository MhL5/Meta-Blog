import { InferSchemaType, Schema, model } from "mongoose";

const ViewSchema = new Schema({
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
ViewSchema.index(
  { articleId: 1, ipAddress: 1, createdAt: 1 },
  { unique: true }
);

type View = InferSchemaType<typeof ViewSchema>;
const ArticleViewModel = model<View>("View", ViewSchema);

export { ArticleViewModel };
