import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MenuService } from './menu.service';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../user/entities/user-role.enum';
import { Menu } from './entities/menu.entity';
import { RestaurantSlug } from '../common/decorators/restaurant-slug.decorator';
import { CreateMenuInput } from './dto/create-menu.input';
import { UpdateMenuInput } from './dto/update-menu.input';
import { UpdateMenuCategoryOrderInput } from './dto/update-menu-category-order.input';
import { MenuCategory } from './entities/menu-category.entity';
import { PaginatedMenusResponse } from './dto/paginated-menus.response';
import { FilterArgs } from '../common/dto/filter.args';
import { PaginationArgs } from '../common/dto/pagination.args';

@Resolver(() => Menu)
export class MenuResolver {
  constructor(private readonly menuService: MenuService) {}

  @Roles(UserRole.ADMIN)
  @Query(() => Menu, { nullable: true })
  async menu(@Args('id') id: string, @RestaurantSlug() slug: string) {
    return this.menuService.findOne(id, slug);
  }

  @Roles(UserRole.ADMIN)
  @Query(() => PaginatedMenusResponse)
  async menus(
    @Args() paginationArgs: PaginationArgs,
    @Args() filterArgs: FilterArgs,
    @RestaurantSlug() slug: string,
  ) {
    return this.menuService.findAll(paginationArgs, filterArgs, slug);
  }
  @Roles(UserRole.ADMIN)
  @Mutation(() => Menu)
  async createMenu(
    @Args('createMenuInput') createMenuInput: CreateMenuInput,
    @RestaurantSlug() slug: string,
  ) {
    return this.menuService.createMenu(createMenuInput, slug);
  }

  @Roles(UserRole.ADMIN)
  @Mutation(() => Menu)
  async editMenu(
    @Args('updateMenuInput') updateMenuInput: UpdateMenuInput,
    @RestaurantSlug() slug: string,
  ) {
    return this.menuService.editMenu(updateMenuInput, slug);
  }

  @Roles(UserRole.ADMIN)
  @Mutation(() => [MenuCategory])
  async updateMenuCategoryOrder(
    @Args('updateMenuCategoryOrderInput')
    updateMenuCategoryOrderInput: UpdateMenuCategoryOrderInput,
    @RestaurantSlug() slug: string,
  ) {
    return this.menuService.updateMenuCategoryOrder(
      updateMenuCategoryOrderInput,
      slug,
    );
  }

  @Roles(UserRole.ADMIN)
  @Mutation(() => Menu)
  async deleteMenu(@Args('id') id: string, @RestaurantSlug() slug: string) {
    return this.menuService.deleteMenu(id, slug);
  }
}
