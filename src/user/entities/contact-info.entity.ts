import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AppUser } from './app-user.entity';
import { Country } from './country.entity';

@ObjectType()
@Entity()
export class ContactInfo {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  address: string;

  @Field()
  @Column()
  phone: string;

  @Field()
  @Column()
  email: string;

  @OneToOne(() => AppUser, user => user.contactInfo)
  user: AppUser;

  @Field(() => Country)
  @ManyToOne(() => Country, country => country.contacts, {
    eager: true
  })
  country: Country;
}
