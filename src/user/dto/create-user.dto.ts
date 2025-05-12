import { Field, InputType, ID } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
class ContactInfoInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  address: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @Field()
  @IsEmail()
  email: string;

  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  countryId: string;
}

@InputType()
class UserDocumentInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  documentNumber: string;

  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  typeDocumentId: string;
}

@InputType()
export class CreateUserDto {
  @Field()
  @IsString()
  @Length(1, 20)
  name: string;

  @Field()
  @IsString()
  @Length(1, 20)
  lastName: string;

  @Field()
  @IsBoolean()
  isMilitar: boolean;

  @Field()
  @IsBoolean()
  isTemporal: boolean;

  @Field()
  @IsString()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Field()
  @IsEmail()
  email: string;

  @Field(() => ContactInfoInput)
  @ValidateNested()
  @Type(() => ContactInfoInput)
  contactInfo: ContactInfoInput;

  @Field(() => [UserDocumentInput])
  @ValidateNested({ each: true })
  @Type(() => UserDocumentInput)
  @IsOptional()
  documents?: UserDocumentInput[];
}
