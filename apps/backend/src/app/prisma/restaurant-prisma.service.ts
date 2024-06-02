import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../../prisma-clients/restaurant';
import { TenantPrismaService } from './tenant-prisma.service';

@Injectable()
export class RestaurantPrismaService implements OnModuleInit, OnModuleDestroy {
  private clients: Map<string, PrismaClient> = new Map();

  constructor(private readonly tenantPrisma: TenantPrismaService) {}

  async onModuleInit() {
    // Initialize any clients here if necessary
  }

  async onModuleDestroy() {
    for (const client of this.clients.values()) {
      await client.$disconnect();
    }
  }

  async getClientBySlug(slug: string): Promise<PrismaClient> {
    if (!this.clients.has(slug)) {
      const restaurant = await this.tenantPrisma.restaurant.findUnique({
        where: { slug: slug },
      });

      if (!restaurant) {
        throw new Error('Restaurant not found');
      }
      const { host, port, username, password } = restaurant;
      const databaseUrl = `postgresql://${username}:${password}@${host}:${port}/${slug}`;

      const client = new PrismaClient({
        datasources: {
          db: {
            url: databaseUrl,
          },
        },
      });

      this.clients.set(slug, client);
    }

    return this.clients.get(slug);
  }
}
