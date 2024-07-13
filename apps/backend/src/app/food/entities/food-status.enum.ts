import { registerEnumType } from '@nestjs/graphql';

export enum FoodStatus {
  IN_STOCK = 'IN_STOCK',
  DRAFT = 'DRAFT',
  ARCHIVED = 'ARCHIVED',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
}

registerEnumType(FoodStatus, {
  name: 'FoodStatus',
});
