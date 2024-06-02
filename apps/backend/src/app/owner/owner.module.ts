import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerResolver } from './owner.resolver';
import { TenantPrismaService } from '../prisma/tenant-prisma.service';
import { FirebaseAdminService } from '../firebase/firebase-admin.service';

@Module({
  providers: [
    OwnerResolver,
    OwnerService,
    TenantPrismaService,
    FirebaseAdminService,
  ],
})
export class OwnerModule {}
