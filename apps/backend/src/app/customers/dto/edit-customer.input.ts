import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class EditCustomerInput {
  @Field(() => ID)
  @IsNotEmpty({ message: 'ID should not be empty.' })
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  disabled?: boolean;
}
