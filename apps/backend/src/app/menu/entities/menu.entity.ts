import { ObjectType, Field, ID } from '@nestjs/graphql';
import { MenuCategory } from './menu-category.entity';

@ObjectType()
export class Menu {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => [MenuCategory])
  menuCategories: MenuCategory[];

  @Field()
  active: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
