import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class FoodCustomization {
  @Field()
  name: string;

  @Field()
  costPrice: number;

  @Field()
  sellingPrice: number;

  @Field({ nullable: true })
  isDefault?: boolean;
}
