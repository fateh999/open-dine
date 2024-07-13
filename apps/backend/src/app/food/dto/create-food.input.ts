import { InputType, Field } from '@nestjs/graphql';
import { CreateFoodCustomizationInput } from './create-food-customization.input';
import { FoodType } from '../entities/food-type.enum';
import { FoodStatus } from '../entities/food-status.enum';

@InputType()
export class CreateFoodInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  photoUrl?: string;

  @Field()
  categoryId: string;

  @Field(() => FoodType)
  foodType: FoodType;

  @Field(() => FoodStatus)
  status: FoodStatus;

  @Field(() => [CreateFoodCustomizationInput], { nullable: true })
  customizations?: CreateFoodCustomizationInput[];
}
