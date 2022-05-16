import { Field, ID, Int, ObjectType } from "type-graphql";
import { Post } from "./Post";

@ObjectType()
export class User {
  @Field((_type) => ID)
  id!: string;

  @Field()
  name!: string;

  password!: string;

  @Field((_type) => Int)
  age?: number;

  @Field((_type) => [Post])
  posts?: Post[];
}
