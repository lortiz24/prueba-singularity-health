import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { AppUser } from './app-user.entity';
import { TypeDocument } from './type-document.entity';

@ObjectType()
@Entity('UserDocument_TB')
export class UserDocument {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  documentNumber: string;

  @Field(() => TypeDocument)
  @ManyToOne(() => TypeDocument, typeDocument => typeDocument.userDocuments)
  typeDocument: TypeDocument;

  @Field(() => AppUser)
  @ManyToOne(() => AppUser, user => user.documents)
  user: AppUser;
}