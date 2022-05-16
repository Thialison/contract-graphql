import gql from "graphql-tag";

const createUser = gql`
  mutation Signup($name: String!, $password: String!, $age: Float!) {
    createUser(name: $name, password: $password, age: $age) {
      id
      name
      age
    }
  }
`;

export default createUser;
