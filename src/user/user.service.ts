import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { AppUser } from './entities/app-user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ContactInfo } from './entities/contact-info.entity';
import { handleDatabaseError } from '../common/helpers/database-error.helper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(AppUser)
    private readonly userRepository: Repository<AppUser>,
    @InjectRepository(ContactInfo)
    private readonly contactInfoRepository: Repository<ContactInfo>,
    private dataSource: DataSource,
  ) {}

  async findOne(id: string): Promise<AppUser> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: {
          contactInfo: {
            country: true
          },
          documents: {
            typeDocument: true
          }
        }
      });

      if (!user) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (error) {
      const dbError = handleDatabaseError(error);
      throw new HttpException(dbError, HttpStatus.BAD_REQUEST);
    }
  }

  async create(createUserDto: CreateUserDto): Promise<AppUser> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const country = await queryRunner.manager.findOne('Country_TB', {
        where: { id: createUserDto.contactInfo.countryId },
      });

      const contactInfo = this.contactInfoRepository.create({
        ...createUserDto.contactInfo,
        country,
      });

      const savedContactInfo = await queryRunner.manager.save(contactInfo);

      const user = this.userRepository.create({
        name: createUserDto.name,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        emailVerified: false,
        password: createUserDto.password,
        username: createUserDto.username,
        isMilitar: createUserDto.isMilitar,
        contactInfo: savedContactInfo,
      });

      const savedUser = await queryRunner.manager.save(user);
      console.log('savedUser', savedUser);
      await queryRunner.commitTransaction();
      return savedUser;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      const dbError = handleDatabaseError(error);
      throw new HttpException(dbError, HttpStatus.BAD_REQUEST);
    } finally {
      console.log('hola 4');
      await queryRunner.release();
    }
  }
}
