import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TenantPrismaService } from '../prisma/tenant-prisma.service';
import { FirebaseAdminService } from '../firebase/firebase-admin.service';
import { RestaurantPrismaService } from '../prisma/restaurant-prisma.service';

@Module({
  providers: [
    UserResolver,
    UserService,
    TenantPrismaService,
    RestaurantPrismaService,
    FirebaseAdminService,
  ],
})
export class UserModule {}
