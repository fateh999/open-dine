import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  Matches,
} from 'class-validator';

@InputType()
export class CreateOwnerInput {
  @Field()
  @IsNotEmpty({ message: 'Display name is required.' })
  displayName: string;

  @Field()
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Password should not be empty.' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.',
    }
  )
  password: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl({}, { message: 'Photo URL must be a valid URL.' })
  photoUrl?: string;
}
