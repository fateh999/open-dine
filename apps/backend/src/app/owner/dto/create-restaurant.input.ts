import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { IsSlug } from '../../common/validators/slug.validator';

@InputType()
export class CreateRestaurantInput {
  @Field()
  @IsNotEmpty({ message: 'Name is required.' })
  name: string;

  @Field()
  @IsNotEmpty({ message: 'Slug is required' })
  @IsSlug({
    message:
      'Slug must be a valid format (only lowercase letters, numbers, and hyphens are allowed, and it cannot start or end with a hyphen).',
  })
  slug: string;
}
