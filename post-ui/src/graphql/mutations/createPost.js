import gql from "graphql-tag";

const createPost = gql`
  mutation CreatePost($userId: String!, $message: String!, $title: String!) {
    createPost(userId: $userId, message: $message, title: $title) {
      id
      title
      message
    }
  }
`;

export default createPost;
