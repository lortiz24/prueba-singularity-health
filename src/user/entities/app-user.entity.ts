import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, OneToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ContactInfo } from './contact-info.entity';
import { UserDocument } from './user-document.entity';

@ObjectType()
@Entity()
export class AppUser {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field(() => ContactInfo)
  @OneToOne(() => ContactInfo, contactInfo => contactInfo.user, {
    cascade: true,
    eager: true
  })
  @JoinColumn()
  contactInfo: ContactInfo;

  @Field(() => [UserDocument], { nullable: true })
  @OneToMany(() => UserDocument, userDocument => userDocument.user, {
    cascade: true,
    eager: true
  })
  documents: UserDocument[];
}
