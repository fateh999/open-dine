import { Injectable } from '@nestjs/common';
import { RestaurantPrismaService } from '../prisma/restaurant-prisma.service';
import { PaginationArgs } from '../common/dto/pagination.args';
import { FilterArgs } from '../common/dto/filter.args';
import { Prisma as RestaurantPrisma } from '../../prisma-clients/restaurant';
import { CreateFoodInput } from './dto/create-food.input';
import { UpdateFoodInput } from './dto/update-food.input';

@Injectable()
export class FoodService {
  constructor(private restaurantPrismaService: RestaurantPrismaService) {}

  async findOne(id: string, slug: string) {
    const client = await this.restaurantPrismaService.getClientBySlug(slug);
    return client.food.findUnique({
      where: { id },
      include: { category: true, customizations: true },
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

    const whereClause: RestaurantPrisma.FoodWhereInput = search
      ? {
          OR: [{ name: { contains: search, mode: 'insensitive' } }],
        }
      : {};

    const [items, conditionalTotalCount, totalCount] = await Promise.all([
      client.food.findMany({
        where: whereClause,
        skip,
        take,
        orderBy: sortBy ? { [sortBy]: sortOrder } : { updatedAt: 'desc' },
        include: { category: true, customizations: true },
      }),
      client.food.count({
        where: whereClause,
      }),
      client.food.count(),
    ]);

    return {
      items,
      totalCount,
      conditionalTotalCount,
      totalPages: Math.ceil(conditionalTotalCount / take),
      currentPage: Math.ceil(skip / take) + 1,
    };
  }

  async createFood(createFoodInput: CreateFoodInput, slug: string) {
    const client = await this.restaurantPrismaService.getClientBySlug(slug);

    const { customizations, ...foodData } = createFoodInput;

    return client.food.create({
      data: {
        ...foodData,
        customizations: {
          create: customizations,
        },
      },
      include: { category: true, customizations: true },
    });
  }

  async editFood(updateFoodInput: UpdateFoodInput, slug: string) {
    const client = await this.restaurantPrismaService.getClientBySlug(slug);
    const { id, customizations, ...data } = updateFoodInput;

    return client.food.update({
      where: { id },
      data: {
        ...data,
        customizations: {
          deleteMany: {},
          create: customizations,
        },
      },
      include: { category: true, customizations: true },
    });
  }

  async deleteFood(id: string, slug: string) {
    const client = await this.restaurantPrismaService.getClientBySlug(slug);
    return client.food.delete({ where: { id } });
  }
}
