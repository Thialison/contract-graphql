import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../models/User";
import { v4 as uuidv4 } from "uuid";
import { Post } from "../models/Post";
import { userSeed, postSeed } from "../utils/seeds";

@Resolver()
export class Resolvers {
  private users: User[] = userSeed;
  private posts: Post[] = postSeed;
  private userPosts: Post[] | any;

  @Query(() => User)
  async getUserById(@Arg("userId") userId: string) {
    const foundUser = this.users.find((user) => user.id === userId);

    if (!foundUser) {
      return new Error("User does not exist");
    }

    foundUser.posts = [];

    // @ts-expect-error
    delete foundUser.password;

    this.posts.map((post) => {
      if (post.user?.id === foundUser.id) {
        foundUser.posts?.push(post);
      }
    });

    return foundUser;
  }

  @Query(() => [Post])
  async getPostsByUser(@Arg("userId") userId: string) {
    const foundUser = this.users.find((user) => user.id === userId);
    if (!foundUser) {
      return new Error("User does not exist");
    }

    this.userPosts = this.posts.filter(
      (post) => post.user?.id === foundUser.id
    );

    if (!this.userPosts) {
      return new Error("User does have posts");
    }

    return this.userPosts;
  }

  @Mutation(() => User)
  async createUser(
    @Arg("name") name: string,
    @Arg("password") password: string,
    @Arg("age") age: number
  ) {
    // Remove age from this Object
    const newUser = { id: uuidv4(), name, password, age };

    this.users.push(newUser);

    return newUser;
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("userId") userId: string,
    @Arg("title") title: string,
    @Arg("message") message?: string
  ) {
    const foundUser = this.users.find((user) => user.id === userId);
    if (!foundUser) {
      return new Error("User does not exist");
    }

    const post = { id: uuidv4(), title, message, user: foundUser };

    this.posts.push(post);

    return post;
  }
}
