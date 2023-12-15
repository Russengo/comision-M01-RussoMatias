import { Schema, model, Types } from "mongoose";

const CommentSchema = new Schema(
  {
    description: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  {
    timestamps: true,
  }
);

export const CommentModel = model("Comment", CommentSchema);
