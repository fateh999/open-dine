import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserRecord } from 'firebase-admin/auth';

export const FirebaseUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserRecord => {
    const gqlContext = GqlExecutionContext.create(ctx);
    const request = gqlContext.getContext().req;
    return request.user as UserRecord;
  }
);
