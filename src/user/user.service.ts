import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
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
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        contactInfo: {
          country: true,
        },
        document: true,
      },
    });

    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<AppUser> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const existingUser = await queryRunner.manager.findOne(AppUser, {
      where: [
        { email: createUserDto.email },
        { username: createUserDto.username },
      ],
    });

    if (existingUser) {
      if (existingUser.email === createUserDto.email) {
        throw new HttpException(
          'Ya existe un usuario con este email',
          HttpStatus.CONFLICT,
        );
      }
      if (existingUser.username === createUserDto.username) {
        throw new HttpException(
          'Ya existe un usuario con este nombre de usuario',
          HttpStatus.CONFLICT,
        );
      }
    }

    const country = await queryRunner.manager.findOne('Country_TB', {
      where: { id: createUserDto.contactInfo.countryId },
    });

    const contactInfo = this.contactInfoRepository.create({
      ...createUserDto.contactInfo,
      country,
    });

    const savedContactInfo = await queryRunner.manager.save(contactInfo);

    let userDocument;
    const typeDocument = await queryRunner.manager.findOne('TypeDocument_TB', {
      where: { id: createUserDto.document.typeDocumentId },
    });

    if (!typeDocument) {
      throw new NotFoundException('Tipo de documento no encontrado');
    }

    //toDo: Es posible agregar una valicacon adicional para evitar que haya usuarios con un mismo documento.

    userDocument = await queryRunner.manager.create('UserDocument', {
      documentNumber: createUserDto.document.documentNumber,
      typeDocument,
    });
    userDocument = await queryRunner.manager.save(userDocument);

    const user = this.userRepository.create({
      name: createUserDto.name,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      emailVerified: false,
      password: createUserDto.password,
      username: createUserDto.username,
      isMilitar: createUserDto.isMilitar,
      isTemporal: createUserDto.isTemporal,
      contactInfo: savedContactInfo,
      document: userDocument,
    });
    try {
      const savedUser = await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
      return savedUser;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      const dbError = handleDatabaseError(error);
      throw new HttpException(dbError.message, HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
  }
}
