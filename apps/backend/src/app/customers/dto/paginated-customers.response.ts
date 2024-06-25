import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Customer } from '../entities/customer.entity';

@ObjectType()
export class PaginatedCustomersResponse {
  @Field(() => [Customer])
  items: Customer[];

  @Field(() => Int)
  totalCount: number;

  @Field(() => Int)
  conditionalTotalCount: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  currentPage: number;
}
