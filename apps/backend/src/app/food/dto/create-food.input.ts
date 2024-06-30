import { InputType, Field } from '@nestjs/graphql';
import { CreateFoodCustomizationInput } from './create-food-customization.input';
import { FoodType } from '../entities/food-type.enum';

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

  @Field(() => [CreateFoodCustomizationInput], { nullable: true })
  customizations?: CreateFoodCustomizationInput[];
}
