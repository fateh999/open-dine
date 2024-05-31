import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserRole } from './user-role.enum';

@ObjectType()
export class User {
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

  @Field(() => UserRole)
  role: UserRole;
}
