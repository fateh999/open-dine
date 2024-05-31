import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const IsSuperAdmin = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): boolean => {
    const gqlContext = GqlExecutionContext.create(ctx);
    const request = gqlContext.getContext().req;
    return request.superadmin ?? false;
  }
);
