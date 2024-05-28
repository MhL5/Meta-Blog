import { InferSchemaType, Schema, model } from "mongoose";

type Article = InferSchemaType<typeof articleSchema>;

const articleSchema = new Schema(
  {
    authorId: {
      type: Schema.ObjectId,
      ref: "User",
      required: [true, "comment must belong to a user"],
    },
    title: {
      type: String,
      required: [true, "articles must include title"],
      unique: true,
      trim: true,
      maxLength: [40, "A title must have less or equal to 40 characters"],
    },
    content: {
      type: String,
      required: [true, "articles must include content"],
    },
    readingTime: {
      type: Number,
      required: [true, "articles must include reading time"],
    },
    avatar: {
      type: String,
      default: "",
    },
    summary: {
      type: String,
      required: [true, "articles must include summary"],
      trim: true,
      maxLength: [150, "A tour must have less or equal to 40 characters"],
      minLength: [10, "A tour must have more or equal to 10 characters"],
    },
    tags: {
      type: [String],
      required: [true, "articles must include tags"],
      trim: true,
      enum: {
        values: [
          "nature",
          "food",
          "inspiration",
          "life style",
          "health",
          "travel",
          "technology",
        ],
        message:
          "tag options are limited, choose between these options: nature, food, inspiration, life style, health, travel, technology",
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate
// reviews will be added dynamically rather than adding it into schema and keeping some useless data in our documents
articleSchema.virtual("articleComments", {
  ref: "ArticleComment",
  // this part says: "tour" field in the "Review" model should match the _id field in the current model
  foreignField: "articleId",
  localField: "_id",
});
// // Virtual populate
// // reviews will be added dynamically rather than adding it into schema and keeping some useless data in our documents
// articleSchema.virtual("articleComments", {
//   ref: "ArticleComment",
//   // this part says: "tour" field in the "Review" model should match the _id field in the current model
//   foreignField: "articleId",
//   localField: "_id",
// });
// // Virtual populate
// // reviews will be added dynamically rather than adding it into schema and keeping some useless data in our documents
// articleSchema.virtual("articleComments", {
//   ref: "ArticleComment",
//   // this part says: "tour" field in the "Review" model should match the _id field in the current model
//   foreignField: "articleId",
//   localField: "_id",
// });

// * Query middleware - this keyword points to a query here
articleSchema.pre(/^find/, function (next) {
  // populating guides reference with user data
  // @ts-expect-error sad
  this.populate({
    path: "authorId",
    select: "fullName _id",
  });

  next();
});

const ArticleModel = model<Article>("Article", articleSchema);

export { ArticleModel };
