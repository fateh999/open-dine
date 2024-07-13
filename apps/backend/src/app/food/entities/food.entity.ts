import { ObjectType, Field } from '@nestjs/graphql';
import { FoodType } from './food-type.enum';
import { Category } from 'src/app/category/entities/category.entity';
import { FoodCustomization } from './food-customization.entity';
import { FoodStatus } from './food-status.enum';

@ObjectType()
export class Food {
  @Field()
  id: string;

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

  @Field(() => Category)
  category: Category;

  @Field(() => [FoodCustomization])
  customizations: FoodCustomization[];

  @Field(() => FoodStatus)
  status: FoodStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
