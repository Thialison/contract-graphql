import SIGNUP from "../graphql/mutations/createUser";
import { GraphQLInteraction, Matchers } from "@pact-foundation/pact";
import { print } from "graphql/language/printer";
import Provider from "../../pact/pactProvider";
import { pactClient } from "../../pact/pactClient";

const provider = Provider;

beforeAll(async () => {
  await provider.setup();
});

afterAll(() => provider.finalize());

afterEach(() => provider.verify());

const mutationString = print(SIGNUP);

const mutationCreateUser = () => {
  return pactClient()
    .mutate({
      mutation: SIGNUP,
      variables: {
        name: "Fake Author",
        password: "password",
        age: 32,
      },
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
    });
};

describe("mutation createUser on /graphql", () => {
  beforeEach(() => {
    const createMessageMutation = new GraphQLInteraction()
      .uponReceiving("a CreateUser mutation")
      .withMutation(mutationString)
      .withVariables({
        name: "Fake Author",
        password: "password",
        age: 32,
      })
      .withOperation("Signup")
      .withRequest({
        path: "/",
        method: "POST",
      })
      .willRespondWith({
        status: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: {
          data: {
            createUser: {
              id: Matchers.like("374d700f-521d-4a00-a992-d37261fcdc9d"),
              name: Matchers.like("Fake Author"),
              age: Matchers.like(33),
            },
          },
        },
      });
    return provider.addInteraction(createMessageMutation);
  });

  it("returns the correct response", async () => {
    const response = await mutationCreateUser();
    console.log(response);
  }, 70000);
});
