import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateFoodInput } from './create-food.input';
import { CreateFoodCustomizationInput } from './create-food-customization.input';

@InputType()
export class UpdateFoodInput extends PartialType(CreateFoodInput) {
  @Field()
  id: string;

  @Field(() => [CreateFoodCustomizationInput], { nullable: true })
  customizations?: CreateFoodCustomizationInput[];
}
