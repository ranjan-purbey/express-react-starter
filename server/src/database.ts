import "reflect-metadata";
import { ConnectionOptions, getConnectionManager } from "typeorm";
import { Post } from "./entities/Post";
import { Comment } from "./entities/Comment";

const ormConfig: ConnectionOptions = {
  ...require("../ormconfig"),
  entities: [Post, Comment],
  migrations: [],
};

export const ensureConnection = async (name = "default") => {
  const connectionManager = getConnectionManager();

  if (connectionManager.has(name)) {
    const connection = connectionManager.get(name);

    if (!connection.isConnected) {
      await connection.connect();
    }

    return connection;
  }

  return await connectionManager
    .create({ name, ...ormConfig } as ConnectionOptions)
    .connect();
};
