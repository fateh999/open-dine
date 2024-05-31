import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CreateUserInput } from './create-user.input';

@InputType()
export class EditUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  @IsNotEmpty({ message: 'ID should not be empty.' })
  id: string;
}
