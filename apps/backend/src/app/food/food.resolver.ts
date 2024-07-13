import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FoodService } from './food.service';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../user/entities/user-role.enum';
import { Food } from './entities/food.entity';
import { RestaurantSlug } from '../common/decorators/restaurant-slug.decorator';
import { PaginatedFoodsResponse } from './dto/paginated-foods.response';
import { PaginationArgs } from '../common/dto/pagination.args';
import { FilterArgs } from '../common/dto/filter.args';
import { CreateFoodInput } from './dto/create-food.input';
import { UpdateFoodInput } from './dto/update-food.input';

@Resolver(() => Food)
export class FoodResolver {
  constructor(private readonly foodService: FoodService) {}

  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Query(() => Food, { nullable: true })
  async food(@Args('id') id: string, @RestaurantSlug() slug: string) {
    return this.foodService.findOne(id, slug);
  }

  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Query(() => PaginatedFoodsResponse)
  async foods(
    @Args() paginationArgs: PaginationArgs,
    @Args() filterArgs: FilterArgs,
    @RestaurantSlug() slug: string,
  ) {
    return this.foodService.findAll(paginationArgs, filterArgs, slug);
  }

  @Roles(UserRole.ADMIN)
  @Mutation(() => Food)
  async createFood(
    @Args('createFoodInput') createFoodInput: CreateFoodInput,
    @RestaurantSlug() slug: string,
  ) {
    return this.foodService.createFood(createFoodInput, slug);
  }

  @Roles(UserRole.ADMIN)
  @Mutation(() => Food)
  async editFood(
    @Args('updateFoodInput') updateFoodInput: UpdateFoodInput,
    @RestaurantSlug() slug: string,
  ) {
    return this.foodService.editFood(updateFoodInput, slug);
  }

  @Roles()
  @Mutation(() => Food)
  async deleteFood(@Args('id') id: string, @RestaurantSlug() slug: string) {
    return this.foodService.deleteFood(id, slug);
  }
}
