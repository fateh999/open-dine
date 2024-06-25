import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsBoolean,
} from 'class-validator';

@InputType()
export class SyncCustomerInput {
  @Field()
  @IsNotEmpty({ message: 'ID should not be empty.' })
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: 'Display name should not be empty when provided.' })
  displayName: string;

  @Field()
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl({}, { message: 'Photo URL must be a valid URL.' })
  photoUrl?: string;

  @Field()
  @IsBoolean({ message: 'Disabled must be a boolean value.' })
  disabled: boolean;
}
