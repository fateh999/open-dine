import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantResolver } from './restaurant.resolver';
import { TenantPrismaService } from '../prisma/tenant-prisma.service';

@Module({
  providers: [RestaurantResolver, RestaurantService, TenantPrismaService],
})
export class RestaurantModule {}
