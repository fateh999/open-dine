import { Injectable } from '@nestjs/common';
import { SyncUserInput } from './dto/sync-user.input';
import { Prisma as RestaurantPrisma } from '../../prisma-clients/restaurant';
import { FirebaseAdminService } from '../firebase/firebase-admin.service';
import { CreateUserInput } from './dto/create-user.input';
import { UserRole } from './entities/user-role.enum';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { EditUserInput } from './dto/edit-user.input';
import { RestaurantPrismaService } from '../prisma/restaurant-prisma.service';
import { PaginationArgs } from '../common/dto/pagination.args';
import { FilterArgs } from '../common/dto/filter.args';

@Injectable()
export class UserService {
  constructor(
    private restaurantPrismaService: RestaurantPrismaService,
    private firebaseAdminService: FirebaseAdminService,
  ) {}

  async findOne(id: string, slug: string) {
    const client = await this.restaurantPrismaService.getClientBySlug(slug);
    return client.user.findUnique({ where: { id } });
  }

  async sync(
    data: SyncUserInput,
    slug: string,
    role: UserRole = UserRole.STAFF,
  ) {
    const client = await this.restaurantPrismaService.getClientBySlug(slug);
    return client.user.upsert({
      where: { id: data.id },
      update: { ...data },
      create: { ...data, role: role },
    });
  }

  async findAll(
    paginationArgs: PaginationArgs,
    filterArgs: FilterArgs,
    slug: string,
    superadmin: boolean,
  ) {
    const { skip, take } = paginationArgs;
    const { search, sortBy, sortOrder } = filterArgs;
    const client = await this.restaurantPrismaService.getClientBySlug(slug);
    const roles = [UserRole.STAFF, ...(superadmin ? [UserRole.ADMIN] : [])];

    const whereClause: RestaurantPrisma.UserWhereInput = search
      ? {
          OR: [
            { displayName: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
          ],
          AND: [
            {
              role: {
                in: roles,
              },
            },
          ],
        }
      : {
          role: { in: roles },
        };

    const [items, conditionalTotalCount, totalCount] = await Promise.all([
      client.user.findMany({
        where: whereClause,
        skip,
        take,
        orderBy: sortBy ? { [sortBy]: sortOrder } : { updatedAt: 'desc' },
      }),
      client.user.count({
        where: whereClause,
      }),
      client.user.count(),
    ]);

    return {
      items,
      totalCount,
      conditionalTotalCount,
      totalPages: Math.ceil(conditionalTotalCount / take),
      currentPage: Math.ceil(skip / take) + 1,
    };
  }

  async findInFirebase(email: string) {
    return this.firebaseAdminService.getUserByEmail(email);
  }

  async createOrFindInFirebase(data: CreateUserInput) {
    let user: UserRecord;
    try {
      user = await this.findInFirebase(data.email);
    } catch (error) {
      user = await this.firebaseAdminService.createUser({
        ...data,
        emailVerified: true,
      });
    }
    return user;
  }

  async updateUserInFirebase(data: EditUserInput) {
    const { id, ...editData } = data;
    const user = await this.firebaseAdminService.updateUser(id, editData);
    return user;
  }

  async deleteUser(id: string, slug: string) {
    const client = await this.restaurantPrismaService.getClientBySlug(slug);
    return client.user.delete({
      where: { id: id },
    });
  }

  async deleteUserInFirebase(id: string) {
    return this.firebaseAdminService.deleteUser(id);
  }
}
