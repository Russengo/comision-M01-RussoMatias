import { Router } from "express";
import {
  ctrlCreatePost,
  ctrlDeletePost,
  ctrlGetAllPost,
  ctrlGetPost,
  ctrlListPost,
  ctrlupdatePost,
} from "../controllers/post.controller.js";
import {
  createPostValidation,
  listPostValidation,
} from "../models/validations/post-validations.js";

const postRouter = Router();

postRouter.post("/", createPostValidation, ctrlCreatePost);
postRouter.get("/", listPostValidation, ctrlListPost);

postRouter.get("/public", ctrlGetAllPost);

postRouter.get("/:postId", ctrlGetPost);
postRouter.patch("/:postId", ctrlupdatePost);
postRouter.delete("/:postId", ctrlDeletePost);

export { postRouter };
