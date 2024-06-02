import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsSlug(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isSlug',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
          return typeof value === 'string' && slugRegex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid slug (only lowercase letters, numbers, and hyphens are allowed, and it cannot start or end with a hyphen)`;
        },
      },
    });
  };
}
