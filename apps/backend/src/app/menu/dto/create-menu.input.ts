import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
class CreateMenuCategoryInput {
  @Field()
  categoryId: string;

  @Field()
  menuOrder: number;
}

@InputType()
export class CreateMenuInput {
  @Field()
  @IsNotEmpty({ message: 'Name is required.' })
  name: string;

  @Field({ defaultValue: false, nullable: true })
  active: boolean;

  @Field(() => [CreateMenuCategoryInput])
  menuCategories: CreateMenuCategoryInput[];
}
