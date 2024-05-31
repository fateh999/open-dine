import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FilterUserArgs {
  @Field({ nullable: true })
  search?: string;

  @Field({ nullable: true })
  sortBy?: string;

  @Field({ nullable: true })
  sortOrder?: 'asc' | 'desc';
}
