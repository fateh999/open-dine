import { Injectable } from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
import { TenantPrismaService } from '../prisma/tenant-prisma.service';
import { UserRecord } from 'firebase-admin/auth';
import { FirebaseAdminService } from '../firebase/firebase-admin.service';
import { SyncOwnerInput } from './dto/sync-owner.input';

@Injectable()
export class OwnerService {
  constructor(
    private readonly tenantPrismaService: TenantPrismaService,
    private readonly firebaseAdminService: FirebaseAdminService
  ) {}

  async syncOwner(data: SyncOwnerInput) {
    return this.tenantPrismaService.owner.upsert({
      where: { id: data.id },
      update: { ...data },
      create: { ...data },
    });
  }

  async createOrFindInFirebase(data: CreateOwnerInput) {
    let user: UserRecord;
    try {
      user = await this.firebaseAdminService.getUserByEmail(data.email);
    } catch (error) {
      user = await this.firebaseAdminService.createUser({
        ...data,
        emailVerified: true,
      });
    }
    return user;
  }
}
