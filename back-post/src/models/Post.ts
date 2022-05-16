import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class Post {
  @Field((_type) => ID)
  id!: string;

  @Field()
  title!: string;

  @Field()
  message?: string;

  @Field((_type) => User)
  user?: User;
}
