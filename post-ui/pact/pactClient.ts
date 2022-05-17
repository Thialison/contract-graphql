import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

export const pactClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache({
      addTypename: false,
    }),
    link: createHttpLink({
      fetch: require("node-fetch"),
      headers: {},
      uri: `http://localhost:4000/`,
    }),
  });
};
