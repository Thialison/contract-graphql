export const userSeed = [
  { id: "666", name: "Katy", password: "test", age: 18, posts: [] },
  { id: "123", name: "Mariana", password: "test", age: 28, posts: [] },
  { id: "1000", name: "João", password: "test", age: 22, posts: [] },
  { id: "1", name: "Kaio", password: "test", age: 30, posts: [] },
];

export const postSeed = [
  {
    id: "1",
    title: "Meu primeiro Post",
    message: `
        Agora estou aprendendo teste de contrato com GraphQL!
        Não sei se gosto mais de Frontend ou de Backend.
      `,
    user: {
      id: "666",
      name: "Katy",
      password: "test",
      age: 18,
    },
  },
  {
    id: "2",
    title: "NFT",
    message: `
        Acabei de comprar meu novo NFT
      `,
    user: {
      id: "666",
      name: "Katy",
      password: "test",
      age: 18,
    },
  },
  {
    id: "3",
    title: "Faculdade",
    message: `
        A faculdade está me matando!.
        #cansada
      `,
    user: {
      id: "666",
      name: "Katy",
      password: "test",
      age: 18,
    },
  },
];
