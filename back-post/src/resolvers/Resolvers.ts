import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../models/User";
import { v4 as uuidv4 } from "uuid";
import { Post } from "../models/Post";
import { prisma } from "../prisma/client";

@Resolver()
export class Resolvers {
  @Query(() => User)
  async getUserById(@Arg("userId") userId: string) {
    const foundUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        posts: true,
      },
    });

    if (!foundUser) {
      return new Error("User does not exist");
    }

    return foundUser;
  }

  @Query(() => [Post])
  async getPostsByUser(@Arg("userId") userId: string) {
    const foundUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!foundUser) {
      return new Error("User does not exist");
    }

    const foundPostFromUser = await prisma.post.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
      },
    });

    if (!foundPostFromUser) {
      return new Error("User does have posts");
    }

    return foundPostFromUser;
  }

  @Mutation(() => User)
  async createUser(
    @Arg("name") name: string,
    @Arg("password") password: string,
    @Arg("age") age: number
  ) {
    const newUser = { id: uuidv4(), name, password, age };

    console.log(newUser);

    return prisma.user.create({
      data: newUser,
    });
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("userId") userId: string,
    @Arg("title") title: string,
    @Arg("message") message?: string
  ) {
    const foundUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!foundUser) {
      return new Error("User does not exist");
    }

    const post = {
      id: uuidv4(),
      title,
      message,
      userId: foundUser.id,
    };

    return prisma.post.create({
      data: post,
    });
  }
}
