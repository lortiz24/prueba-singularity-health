import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ContactInfo } from './contact-info.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('Country_TB')
export class Country {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 4 })
  countryCode: string;

  @Field()
  @Column({ length: 100 })
  countryName: string;

  @OneToMany(() => ContactInfo, contactInfo => contactInfo.country)
  contactInfos: ContactInfo[];
}
