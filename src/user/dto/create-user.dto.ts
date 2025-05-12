import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
class ContactInfoInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  address: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  phone: string;

  @Field()
  @IsEmail()
  email: string;
}

@InputType()
export class CreateUserDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Field(() => ContactInfoInput)
  @ValidateNested()
  @Type(() => ContactInfoInput)
  contactInfo: ContactInfoInput;
}
