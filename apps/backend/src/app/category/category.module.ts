import { Module } from '@nestjs/common';
import { TenantPrismaService } from '../prisma/tenant-prisma.service';
import { FirebaseAdminService } from '../firebase/firebase-admin.service';
import { RestaurantPrismaService } from '../prisma/restaurant-prisma.service';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';

@Module({
  providers: [
    CategoryResolver,
    CategoryService,
    TenantPrismaService,
    RestaurantPrismaService,
    FirebaseAdminService,
  ],
})
export class CategoryModule {}
