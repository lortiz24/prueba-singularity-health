import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ContactInfo } from './contact-info.entity';

@ObjectType()
@Entity('Country_TB')
export class Country {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  name: string;

  @Field()
  @Column({ length: 3 })
  code: string;

  @OneToMany(() => ContactInfo, contactInfo => contactInfo.country)
  contacts: ContactInfo[];
}
