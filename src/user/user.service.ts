import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppUser } from './entities/app-user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ContactInfo } from './entities/contact-info.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(AppUser)
    private readonly userRepository: Repository<AppUser>,
    @InjectRepository(ContactInfo)
    private readonly contactInfoRepository: Repository<ContactInfo>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<AppUser> {
    const contactInfo = this.contactInfoRepository.create(
      createUserDto.contactInfo,
    );
    await this.contactInfoRepository.save(contactInfo);

    const user = this.userRepository.create({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      contactInfo,
    });

    return this.userRepository.save(user);
  }
}
