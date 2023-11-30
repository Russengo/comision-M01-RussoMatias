// app.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { config } = require("./src/settings/config.js");
const { startConnection } = require("./src/settings/database.js");

const postRouter = require("./src/routes/post-routes.js");
const userRouter = require("./src/routes/user-routes.js");
const commentRouter = require("./src/routes/comment-routes.js");

const app = express();

//middlewar
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(helmet());
app.use(morgan("dev"));

// Rutas
app.use("/api/post", postRouter);
app.use("/api/user", userRouter);
app.use("/api/comment", commentRouter);

app.listen(config.port, async () => {
  await startConnection({ uri: config.mongo, database: config.database });
  console.log("Server on port http://localhost:" + config.port);
});
