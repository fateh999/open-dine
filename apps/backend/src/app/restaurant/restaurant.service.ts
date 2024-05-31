import { Injectable } from '@nestjs/common';
import { TenantPrismaService } from '../prisma/tenant-prisma.service';

@Injectable()
export class RestaurantService {
  constructor(private tenantPrismaService: TenantPrismaService) {}

  async findOne(id: string) {
    return this.tenantPrismaService.restaurant.findUnique({ where: { id } });
  }
}
