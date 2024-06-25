import { Module } from '@nestjs/common';
import { TenantPrismaService } from '../prisma/tenant-prisma.service';
import { FirebaseAdminService } from '../firebase/firebase-admin.service';
import { RestaurantPrismaService } from '../prisma/restaurant-prisma.service';
import { CustomersResolver } from './customers.resolver';
import { CustomersService } from './customers.service';

@Module({
  providers: [
    CustomersResolver,
    CustomersService,
    TenantPrismaService,
    RestaurantPrismaService,
    FirebaseAdminService,
  ],
})
export class CustomersModule {}
