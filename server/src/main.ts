import express from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const main = () => {
  const app = express();
  const clientPath = process.env.REACT_PATH || path.resolve("../client/build");

  app.use(express.static(clientPath));
  app.get("/api", (req, res) => res.send({ a: 12 }));
  app.get("/*", (req, res) =>
    res.sendFile(path.join(clientPath, "index.html"))
  );
  const port = process.env.PORT || 3001;
  app.listen(port, () => console.log(`Listening on port ${port}`));
};

main();
