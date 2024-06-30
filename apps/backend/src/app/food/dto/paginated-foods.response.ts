import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Food } from '../entities/food.entity';

@ObjectType()
export class PaginatedFoodsResponse {
  @Field(() => [Food])
  items: Food[];

  @Field(() => Int)
  totalCount: number;

  @Field(() => Int)
  conditionalTotalCount: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  currentPage: number;
}
