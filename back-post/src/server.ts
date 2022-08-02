import "reflect-metadata";

import path from "path";
import { buildSchema } from "type-graphql";
import { Resolvers } from "./resolvers/Resolvers";
import { createServer } from "http";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { prisma } from "./prisma/client";
import cors from "cors";

export async function startServer() {
  const app = express();
  const httpServer = createServer(app);

  app.use(
    cors({
      origin: "*",
    })
  );

  const schema = await buildSchema({
    resolvers: [Resolvers],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });

  const apolloServer = new ApolloServer({
    schema,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    path: "/graphql",
  });

  httpServer.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`Server listening on localhost:4000${apolloServer.graphqlPath}`)
  );
}

startServer()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
