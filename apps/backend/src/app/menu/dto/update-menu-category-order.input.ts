import { InputType, Field } from '@nestjs/graphql';

@InputType()
class MenuCategoryOrder {
  @Field()
  menuOrder: number;
}

@InputType()
export class UpdateMenuCategoryOrderInput {
  @Field()
  id: string;

  @Field(() => [MenuCategoryOrder])
  menuCategoryOrders: MenuCategoryOrder[];
}
