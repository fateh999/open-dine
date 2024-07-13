import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Menu } from '../entities/menu.entity';

@ObjectType()
export class PaginatedMenusResponse {
  @Field(() => [Menu])
  items: Menu[];

  @Field(() => Int)
  totalCount: number;

  @Field(() => Int)
  conditionalTotalCount: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  currentPage: number;
}
