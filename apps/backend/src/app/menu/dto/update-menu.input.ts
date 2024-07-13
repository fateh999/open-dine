import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateMenuInput } from './create-menu.input';

@InputType()
export class UpdateMenuInput extends PartialType(CreateMenuInput) {
  @Field(() => ID)
  id: string;

  @Field(() => Boolean)
  active: boolean;
}
