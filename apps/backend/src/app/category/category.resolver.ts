import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../user/entities/user-role.enum';
import { Category } from './entities/category.entity';
import { RestaurantSlug } from '../common/decorators/restaurant-slug.decorator';
import { PaginatedCategoriesResponse } from './dto/paginated-categories.response';
import { PaginationArgs } from '../common/dto/pagination.args';
import { FilterArgs } from '../common/dto/filter.args';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(UserRole.ADMIN)
  @Query(() => Category, { nullable: true })
  async category(@Args('id') id: string, @RestaurantSlug() slug: string) {
    return this.categoryService.findOne(id, slug);
  }

  @Roles(UserRole.ADMIN)
  @Query(() => PaginatedCategoriesResponse)
  async categories(
    @Args() paginationArgs: PaginationArgs,
    @Args() filterArgs: FilterArgs,
    @RestaurantSlug() slug: string,
  ) {
    return this.categoryService.findAll(paginationArgs, filterArgs, slug);
  }

  @Mutation(() => Category)
  async createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
    @RestaurantSlug() slug: string,
  ) {
    return this.categoryService.createCategory(createCategoryInput, slug);
  }

  @Roles(UserRole.ADMIN)
  @Mutation(() => Category)
  async editCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
    @RestaurantSlug() slug: string,
  ) {
    return this.categoryService.editCategory(updateCategoryInput, slug);
  }

  @Roles()
  @Mutation(() => Category)
  async deleteCategory(@Args('id') id: string, @RestaurantSlug() slug: string) {
    return this.categoryService.deleteCategory(id, slug);
  }
}
