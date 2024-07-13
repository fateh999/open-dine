import { Module } from '@nestjs/common';
import { TenantPrismaService } from '../prisma/tenant-prisma.service';
import { FirebaseAdminService } from '../firebase/firebase-admin.service';
import { RestaurantPrismaService } from '../prisma/restaurant-prisma.service';
import { MenuResolver } from './menu.resolver';
import { MenuService } from './menu.service';

@Module({
  providers: [
    MenuResolver,
    MenuService,
    TenantPrismaService,
    RestaurantPrismaService,
    FirebaseAdminService,
  ],
})
export class MenuModule {}
