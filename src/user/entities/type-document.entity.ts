import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserDocument } from './user-document.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('TypeDocument_TB')
export class TypeDocument {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ length: 50 })
  nameTypeDocument: string;

  @OneToMany(() => UserDocument, userDocument => userDocument.typeDocument)
  userDocuments: UserDocument[];
}
