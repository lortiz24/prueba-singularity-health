import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserDocument } from './user-document.entity';
import { ContactInfo } from './contact-info.entity';

@ObjectType()
@Entity('AppUser_TB')
export class AppUser {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 20 })
  lastName: string;

  @Field()
  @Column({ length: 20 })]
  name: string;

  @Field()
  @Column()
  isMilitar: boolean;

  @Field()
  @Column({ type: 'timestamp' })
  timeCreate: Date;

  @Field()
  @Column()
  isTemporal: boolean;

  @Field()
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column({ default: false })
  emailVerified: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  verificationToken: string;

  @OneToMany(() => UserDocument, (userDocument) => userDocument.user)
  documents: UserDocument[];

  @OneToOne(() => ContactInfo, (contactInfo) => contactInfo.user)
  contactInfo: ContactInfo;
}
