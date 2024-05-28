import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RestaurantSlug = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request['restaurantSlug'];
  }
);
