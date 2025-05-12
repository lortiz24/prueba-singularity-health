import { Field, ObjectType, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AppUser } from './app-user.entity';
import { TypeDocument } from './type-document.entity';

@ObjectType()
@Entity()
export class UserDocument {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  documentNumber: string;

  @Field(() => TypeDocument)
  @ManyToOne(() => TypeDocument, (typeDocument) => typeDocument.userDocuments, {
    eager: true,
  })
  typeDocument: TypeDocument;

  @OneToMany(() => AppUser, (user) => user.document)
  users: AppUser[];
}
