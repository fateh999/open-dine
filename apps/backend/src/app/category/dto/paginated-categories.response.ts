import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Category } from '../entities/category.entity';

@ObjectType()
export class PaginatedCategoriesResponse {
  @Field(() => [Category])
  items: Category[];

  @Field(() => Int)
  totalCount: number;

  @Field(() => Int)
  conditionalTotalCount: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  currentPage: number;
}
