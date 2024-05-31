import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES_KEY } from './roles.decorator';
import { UserRole } from '../user/entities/user-role.enum';
import { TenantPrismaService } from '../prisma/tenant-prisma.service';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { RestaurantPrismaService } from '../prisma/restaurant-prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private tenantPrismaService: TenantPrismaService,
    private restaurantPrismaService: RestaurantPrismaService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!requiredRoles) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const user: UserRecord = ctx.getContext().req['user'];

    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const request = ctx.getContext().req;
    const slug: string = request['restaurantSlug'];
    const client = await this.restaurantPrismaService.getClientBySlug(slug);
    const dbUser = await client.user.findUnique({
      where: { id: user.uid },
    });
    let hasRole: boolean;
    if (dbUser) {
      hasRole = requiredRoles.some((role) => dbUser.role === role);
    } else {
      const restaurant = await this.tenantPrismaService.restaurant.findUnique({
        where: { ownerId: user.uid, slug: slug },
      });
      if (restaurant) {
        request['superadmin'] = true;
        hasRole = true;
      }
    }

    if (!hasRole) {
      throw new UnauthorizedException('Insufficient permissions');
    }

    return hasRole;
  }
}
