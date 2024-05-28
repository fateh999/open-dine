import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { Public } from './auth/public.decorator';
import { RestaurantSlug } from './prisma/restaurant-slug.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getData(@RestaurantSlug() restaurantSlug: string) {
    return this.appService.getData(restaurantSlug);
  }
}
