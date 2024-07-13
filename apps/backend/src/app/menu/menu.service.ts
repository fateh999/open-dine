import { Injectable } from '@nestjs/common';
import { RestaurantPrismaService } from '../prisma/restaurant-prisma.service';
import { CreateMenuInput } from './dto/create-menu.input';
import { UpdateMenuInput } from './dto/update-menu.input';
import { UpdateMenuCategoryOrderInput } from './dto/update-menu-category-order.input';
import { PaginationArgs } from '../common/dto/pagination.args';
import { FilterArgs } from '../common/dto/filter.args';
import { Prisma as RestaurantPrisma } from '../../prisma-clients/restaurant';

@Injectable()
export class MenuService {
  constructor(private restaurantPrismaService: RestaurantPrismaService) {}

  async createMenu(createMenuInput: CreateMenuInput, slug: string) {
    const client = await this.restaurantPrismaService.getClientBySlug(slug);
    const { name, menuCategories, active } = createMenuInput;

    if (active) {
      await client.menu.updateMany({
        where: { active: true },
        data: { active: false },
      });
    }

    return client.menu.create({
      data: {
        name,
        active,
        menuCategories: {
          create: menuCategories.map((category) => ({
            categoryId: category.categoryId,
            menuOrder: category.menuOrder,
          })),
        },
      },
    });
  }

  async editMenu(updateMenuInput: UpdateMenuInput, slug: string) {
    const client = await this.restaurantPrismaService.getClientBySlug(slug);
    const { name, menuCategories, active, id } = updateMenuInput;

    if (active) {
      await client.menu.updateMany({
        where: { active: true },
        data: { active: false },
      });
    }

    return client.menu.update({
      where: { id },
      data: {
        name,
        active,
        menuCategories: {
          deleteMany: {},
          create: menuCategories.map((category) => ({
            categoryId: category.categoryId,
            menuOrder: category.menuOrder,
          })),
        },
      },
    });
  }

  async updateMenuCategoryOrder(
    updateMenuCategoryOrderInput: UpdateMenuCategoryOrderInput,
    slug: string,
  ) {
    const client = await this.restaurantPrismaService.getClientBySlug(slug);
    const { id, menuCategoryOrders } = updateMenuCategoryOrderInput;
    const updatePromises = menuCategoryOrders.map((categoryOrder) =>
      client.menuCategory.update({
        where: {
          id,
        },
        data: {
          menuOrder: categoryOrder.menuOrder,
        },
      }),
    );
    return Promise.all(updatePromises);
  }

  async findOne(id: string, slug: string) {
    const client = await this.restaurantPrismaService.getClientBySlug(slug);
    return client.menu.findUnique({
      where: { id },
      include: {
        menuCategories: {
          include: {
            category: true,
          },
          orderBy: {
            menuOrder: 'asc',
          },
        },
      },
    });
  }

  async findAll(
    paginationArgs: PaginationArgs,
    filterArgs: FilterArgs,
    slug: string,
  ) {
    const { skip, take } = paginationArgs;
    const { search, sortBy, sortOrder } = filterArgs;
    const client = await this.restaurantPrismaService.getClientBySlug(slug);

    const whereClause: RestaurantPrisma.MenuWhereInput = search
      ? {
          OR: [{ name: { contains: search, mode: 'insensitive' } }],
        }
      : {};

    const [items, conditionalTotalCount, totalCount] = await Promise.all([
      client.menu.findMany({
        where: whereClause,
        skip,
        take,
        orderBy: sortBy ? { [sortBy]: sortOrder } : { updatedAt: 'desc' },
        include: { menuCategories: true },
      }),
      client.menu.count({
        where: whereClause,
      }),
      client.menu.count(),
    ]);

    return {
      items,
      totalCount,
      conditionalTotalCount,
      totalPages: Math.ceil(conditionalTotalCount / take),
      currentPage: Math.ceil(skip / take) + 1,
    };
  }

  async deleteMenu(id: string, slug: string) {
    const client = await this.restaurantPrismaService.getClientBySlug(slug);
    return client.menu.delete({ where: { id } });
  }
}
