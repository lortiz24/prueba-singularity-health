import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { AppUser } from './entities/app-user.entity';
import { ContactInfo } from './entities/contact-info.entity';
import { Country, TypeDocument, UserDocument } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AppUser,
      ContactInfo,
      Country,
      UserDocument,
      TypeDocument,
    ]),
  ],
  providers: [UserResolver, UserService],
})
export class UserModule {}
