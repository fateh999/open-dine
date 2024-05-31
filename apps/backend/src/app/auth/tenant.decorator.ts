import { SetMetadata } from '@nestjs/common';

export const IS_TENANT_KEY = 'isTenant';
export const Tenant = () => SetMetadata(IS_TENANT_KEY, true);
