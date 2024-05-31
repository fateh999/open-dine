import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const RestaurantSlug = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const gqlContext = GqlExecutionContext.create(ctx);
    const request = gqlContext.getContext().req;
    return request.restaurantSlug;
  }
);
