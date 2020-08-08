import express from "express";
import path from "path";
import { ensureConnection } from "./database";
import { Post } from "./entities/Post";

const main = () => {
  const app = express();
  const clientPath = process.env.REACT_PATH || path.resolve("../client/build");

  app.use(express.static(clientPath));
  app.get("/api", async (req, res) => {
    const db = await ensureConnection();
    const posts = await db.manager.find(Post, { relations: ["comments"] });
    res.send({ posts });
  });
  app.get("/*", (req, res) =>
    res.sendFile(path.join(clientPath, "index.html"))
  );
  const port = process.env.PORT || 3001;
  app.listen(port, () => console.log(`Listening on port ${port}`));
};

main();
