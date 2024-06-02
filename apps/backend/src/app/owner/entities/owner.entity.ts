import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Owner {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  displayName?: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  photoUrl?: string;

  @Field()
  disabled: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
