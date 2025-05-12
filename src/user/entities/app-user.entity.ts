import { Field, ObjectType, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { ContactInfo } from './contact-info.entity';
import { UserDocument } from './user-document.entity';

@ObjectType()
@Entity()
export class AppUser {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ length: 20 })
  name: string;

  @Field()
  @Column({ length: 20 })
  lastName: string;

  @Field()
  @Column({ default: false })
  isMilitar: boolean;

  @Field()
  @CreateDateColumn()
  timeCreate: Date;

  @Field()
  @Column({ default: false })
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

  @Field(() => ContactInfo)
  @OneToOne(() => ContactInfo, (contactInfo) => contactInfo.user, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  contactInfo: ContactInfo;

  @Field(() => [UserDocument], { nullable: true })
  @OneToMany(() => UserDocument, (userDocument) => userDocument.user, {
    cascade: true,
    eager: true,
  })
  documents: UserDocument[];
}
