import gql from "graphql-tag";

const getUserById = gql`
  query ($userId: String!) {
    getUserById(userId: $userId) {
      id
      name
      age
      posts {
        title
        message
      }
    }
  }
`;

export default getUserById;
