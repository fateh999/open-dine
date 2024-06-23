import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});
