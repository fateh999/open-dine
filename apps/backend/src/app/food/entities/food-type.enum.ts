import { registerEnumType } from '@nestjs/graphql';

export enum FoodType {
  VEG = 'VEG',
  NON_VEG = 'NON_VEG',
  VEGAN = 'VEGAN',
}

registerEnumType(FoodType, {
  name: 'FoodType',
});
