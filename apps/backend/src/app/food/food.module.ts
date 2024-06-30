import { Module } from '@nestjs/common';
import { TenantPrismaService } from '../prisma/tenant-prisma.service';
import { FirebaseAdminService } from '../firebase/firebase-admin.service';
import { RestaurantPrismaService } from '../prisma/restaurant-prisma.service';
import { FoodResolver } from './food.resolver';
import { FoodService } from './food.service';

@Module({
  providers: [
    FoodResolver,
    FoodService,
    TenantPrismaService,
    RestaurantPrismaService,
    FirebaseAdminService,
  ],
})
export class FoodModule {}
