import { Schema, model, Types } from "mongoose";

const PostsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    imageurl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const PostModel = model("Post", PostsSchema);
