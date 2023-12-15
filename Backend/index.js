import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { userRouter } from "./src/routes/user.routes.js";
import { startConnection } from "./src/settings/database.js";
import { config } from "./src/settings/config.js";
import { postRouter } from "./src/routes/post.routes.js";
import { validateToken } from "./src/middlewares/validate-token.js";
import { commentRouter } from "./src/routes/comment.routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);
app.use(helmet());
app.use(morgan("dev"));

app.use("/api", userRouter);
app.use("/api/allposts", postRouter);
app.use("/api/post", validateToken, postRouter);
app.use("/api/comments", validateToken, commentRouter); //validateToken

app.listen(config.PORT, async () => {
  await startConnection();
  console.log(`Server running on port http://localhost:${config.PORT}`);
});
