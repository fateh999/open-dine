import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateFoodCustomizationInput {
  @Field()
  name: string;

  @Field()
  costPrice: number;

  @Field()
  sellingPrice: number;

  @Field({ nullable: true })
  isDefault?: boolean;
}
