import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { AppUser } from './app-user.entity';
import { Country } from './country.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('ContactInfo_TB')
export class ContactInfo {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 60 })
  address: string;

  @Field()
  @Column({ length: 50 })
  city: string;

  @Field()
  @Column({ length: 20 })
  phone: string;

  @Field()
  @Column({ length: 20 })
  celPhone: string;

  @Field()
  @Column({ length: 100 })
  emergencyName: string;

  @Field()
  @Column({ length: 20 })
  emergencyPhone: string;

  @OneToOne(() => AppUser, (user) => user.contactInfo)
  @JoinColumn({ name: 'UserID' })
  user: AppUser;

  @ManyToOne(() => Country, (country) => country.contactInfos)
  @JoinColumn({ name: 'CountryID' })
  country: Country;
}
