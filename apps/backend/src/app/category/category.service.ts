import { Injectable } from '@nestjs/common';
import { RestaurantPrismaService } from '../prisma/restaurant-prisma.service';
import { PaginationArgs } from '../common/dto/pagination.args';
import { FilterArgs } from '../common/dto/filter.args';
import { Prisma as RestaurantPrisma } from '../../prisma-clients/restaurant';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Injectable()
export class CategoryService {
  constructor(private restaurantPrismaService: RestaurantPrismaService) {}

  async findOne(id: string, slug: string) {
    const client = await this.restaurantPrismaService.getClientBySlug(slug);
    return client.category.findUnique({ where: { id } });
  }

  async findAll(
    paginationArgs: PaginationArgs,
    filterArgs: FilterArgs,
    slug: string,
  ) {
    const { skip, take } = paginationArgs;
    const { search, sortBy, sortOrder } = filterArgs;
    const client = await this.restaurantPrismaService.getClientBySlug(slug);

    const whereClause: RestaurantPrisma.CategoryWhereInput = search
      ? {
          OR: [{ name: { contains: search, mode: 'insensitive' } }],
        }
      : {};

    const [items, conditionalTotalCount, totalCount] = await Promise.all([
      client.category.findMany({
        where: whereClause,
        skip,
        take,
        orderBy: sortBy ? { [sortBy]: sortOrder } : { updatedAt: 'desc' },
      }),
      client.category.count({
        where: whereClause,
      }),
      client.category.count(),
    ]);

    return {
      items,
      totalCount,
      conditionalTotalCount,
      totalPages: Math.ceil(conditionalTotalCount / take),
      currentPage: Math.ceil(skip / take) + 1,
    };
  }

  async findAllCategories(slug: string) {
    const client = await this.restaurantPrismaService.getClientBySlug(slug);

    return client.category.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async createCategory(createCategoryInput: CreateCategoryInput, slug: string) {
    const client = await this.restaurantPrismaService.getClientBySlug(slug);
    return client.category.create({ data: createCategoryInput });
  }

  async editCategory(updateCategoryInput: UpdateCategoryInput, slug: string) {
    const client = await this.restaurantPrismaService.getClientBySlug(slug);
    const { id, ...data } = updateCategoryInput;
    return client.category.update({ data, where: { id } });
  }

  async deleteCategory(id: string, slug: string) {
    const client = await this.restaurantPrismaService.getClientBySlug(slug);
    return client.category.delete({ where: { id } });
  }
}
