import { Injectable } from '@nestjs/common';
import { RestaurantPrismaService } from '../prisma/restaurant-prisma.service';
import { SyncCustomerInput } from './dto/sync-customer.input';
import { PaginationArgs } from '../common/dto/pagination.args';
import { FilterArgs } from '../common/dto/filter.args';
import { Prisma as RestaurantPrisma } from '../../prisma-clients/restaurant';
import { EditCustomerInput } from './dto/edit-customer.input';
import { FirebaseAdminService } from '../firebase/firebase-admin.service';

@Injectable()
export class CustomersService {
  constructor(
    private restaurantPrismaService: RestaurantPrismaService,
    private firebaseAdminService: FirebaseAdminService,
  ) {}

  async findOne(id: string, slug: string) {
    const client = await this.restaurantPrismaService.getClientBySlug(slug);
    return client.customer.findUnique({ where: { id } });
  }

  async sync(data: SyncCustomerInput, slug: string) {
    const client = await this.restaurantPrismaService.getClientBySlug(slug);
    return client.customer.upsert({
      where: { id: data.id },
      update: { ...data },
      create: { ...data },
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

    const whereClause: RestaurantPrisma.CustomerWhereInput = search
      ? {
          OR: [
            { displayName: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    const [items, conditionalTotalCount, totalCount] = await Promise.all([
      client.customer.findMany({
        where: whereClause,
        skip,
        take,
        orderBy: sortBy ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
      }),
      client.customer.count({
        where: whereClause,
      }),
      client.customer.count(),
    ]);

    return {
      items,
      totalCount,
      conditionalTotalCount,
      totalPages: Math.ceil(conditionalTotalCount / take),
      currentPage: Math.ceil(skip / take) + 1,
    };
  }

  async updateUserInFirebase(data: EditCustomerInput) {
    const { id, ...editData } = data;
    const user = await this.firebaseAdminService.updateUser(id, editData);
    return user;
  }
}
