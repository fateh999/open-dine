import { Resolver, Query, Args } from '@nestjs/graphql';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './entities/restaurant.entity';

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Query(() => Restaurant)
  async restaurant(@Args('id') id: string) {
    return this.restaurantService.findOne(id);
  }
}
