import { ObjectType, Field } from '@nestjs/graphql';
import { FoodType } from './food-type.enum';
import { Category } from 'src/app/category/entities/category.entity';
import { FoodCustomization } from './food-customization.entity';

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

  @Field({ defaultValue: true })
  inStock: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
