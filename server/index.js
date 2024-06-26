const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");

app.use(express.json());
app.use(cors());

const server_port = 3001;

//  Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);

const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

const LikesRouter = require("./routes/Likes");
app.use("/likes", LikesRouter);

db.sequelize.sync().then(() => {
  app.listen(server_port, () => {
    console.log("Server is running on port " + server_port + "...");
  });
});
