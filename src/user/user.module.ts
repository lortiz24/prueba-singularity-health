import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './user.resolver';
import {
  AppUser,
  ContactInfo,
  Country,
  TypeDocument,
  UserDocument,
} from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AppUser,
      TypeDocument,
      UserDocument,
      Country,
      ContactInfo,
    ]),
  ],
  providers: [UserResolver],
})
export class UserModule {}
