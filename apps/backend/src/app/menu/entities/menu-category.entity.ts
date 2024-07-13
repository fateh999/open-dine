import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Category } from 'src/app/category/entities/category.entity';

@ObjectType()
export class MenuCategory {
  @Field(() => ID)
  id: string;

  @Field(() => Category)
  category: Category;

  @Field()
  menuOrder: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
