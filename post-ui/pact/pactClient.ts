import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import fetch from "cross-fetch"

export const pactClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache({
      addTypename: false,
    }),
    link: createHttpLink({
      fetch,
      headers: {},
      uri: `http://localhost:5000/`,
    }),
  });
};
