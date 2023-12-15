import { Router } from "express";
import {
  createCommentValidation,
  deleteCommentValidation,
  getCommentValidation,
  listCommentValidation,
  updateCommentValidation,
} from "../models/validations/comment-validation.js";
import {
  ctrlCreateComment,
  ctrlDeleteComment,
  ctrlGetCommentById,
  ctrlListComments,
  ctrlUpdateComment,
} from "../controllers/comment.controller.js";

const commentRouter = Router();

commentRouter.post("/:postId/", createCommentValidation, ctrlCreateComment);
commentRouter.get("/:postId/", listCommentValidation, ctrlListComments);
commentRouter.get(
  "/:postId/:commentId",
  getCommentValidation,
  ctrlGetCommentById
);
commentRouter.delete(
  "/:postId/:commentId",
  deleteCommentValidation,
  ctrlDeleteComment
);
commentRouter.put(
  "/:postId/:commentId",
  updateCommentValidation,
  ctrlUpdateComment
);

export { commentRouter };
