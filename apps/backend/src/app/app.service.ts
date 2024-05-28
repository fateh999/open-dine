import { Injectable } from '@nestjs/common';
import { RestaurantPrismaService } from './prisma/restaurant.prisma.service';

@Injectable()
export class AppService {
  constructor(private restaurantPrismaService: RestaurantPrismaService) {}

  async getData(restaurantSlug: string) {
    const client = await this.restaurantPrismaService.getClientBySlug(
      restaurantSlug
    );
    return client.category.findMany();
  }
}
