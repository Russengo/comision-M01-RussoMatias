import { Router } from "express";
import {
  createUserValidations,
  loginUserValidations,
} from "../models/validations/user-validations.js";
import {
  ctrlCreateUser,
  ctrlFindOneUser,
  ctrlListUsers,
  ctrlLoginUser,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/register", createUserValidations, ctrlCreateUser);
userRouter.post("/login", loginUserValidations, ctrlLoginUser);
userRouter.get("/user", ctrlListUsers);

userRouter.get("/user/:userId", ctrlFindOneUser);

export { userRouter };
