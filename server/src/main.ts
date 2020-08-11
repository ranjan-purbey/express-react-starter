import express from "express";
import path from "path";
import { ApolloServer } from "apollo-server-express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { PostsResolver } from "./resolvers/postsResolver";
import { buildSchema } from "type-graphql";
import { GraphqlContext } from "./types";
import { buildDataloaders } from "./buildDataloaders";
import { CommentsResolver } from "./resolvers/commentsResolver";

const main = async () => {
  const app = express();

  // add apollo-server (graphql) middleware
  const schema = await buildSchema({
    resolvers: [PostsResolver, CommentsResolver],
  });
  const server = new ApolloServer({
    schema,
    async context({ req, res }): Promise<GraphqlContext> {
      return {
        getDataLoader: await buildDataloaders(),
      };
    },
  });

  server.applyMiddleware({ app, path: "/graphql" });

  // redirect all other GET requests to react app
  const clientPath = process.env.REACT_PATH || path.resolve("../client/build");
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(clientPath));
    app.get("*", (req, res) =>
      res.sendFile(path.join(clientPath, "index.html"))
    );
  } else
    app.use(
      createProxyMiddleware({
        target: "http://localhost:3001",
        changeOrigin: true,
        ws: true,
      })
    );
  app.all("*", (req, res) => res.status(404).send({ message: "NOT_FOUND" }));
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Listeing on port ${port}`);
  });
};

main();
