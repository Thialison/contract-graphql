import "reflect-metadata";

import { ApolloServer } from "apollo-server";
import path from "path";
import { buildSchema } from "type-graphql";
import { Resolvers } from "./resolvers/Resolvers";

export async function server() {
  const schema = await buildSchema({
    resolvers: [Resolvers],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen();

  console.log(`Server is running on ${url}`);
}

server();
