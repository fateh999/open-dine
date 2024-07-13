import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IS_TENANT_KEY } from './tenant.decorator';
import { TenantPrismaService } from '../prisma/tenant-prisma.service';

@Injectable()
export class RestaurantGuard implements CanActivate {
  constructor(
    private readonly tenantPrismaService: TenantPrismaService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isTenant = this.reflector.getAllAndOverride<boolean>(IS_TENANT_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isTenant) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const slug = request.headers['x-restaurant-slug'];

    if (!slug) {
      throw new NotFoundException('Restaurant slug is required');
    }

    const restaurant = await this.tenantPrismaService.restaurant.findUnique({
      where: { slug },
    });
    if (restaurant) {
      request.restaurantSlug = slug;
      return true;
    } else {
      throw new NotFoundException('Restaurant slug is invalid');
    }
  }
}
