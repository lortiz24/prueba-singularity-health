import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AppUser } from './app-user.entity';
import { TypeDocument } from './type-document.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('UserDocument_TB')
export class UserDocument {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 20 })
  document: string;

  @Field()
  @Column({ length: 60 })
  placeExpedition: string;

  @Field()
  @Column({ type: 'date' })
  dateExpedition: Date;

  @ManyToOne(() => AppUser, user => user.documents)
  @JoinColumn({ name: 'UserID' })
  user: AppUser;

  @ManyToOne(() => TypeDocument, typeDocument => typeDocument.userDocuments)
  @JoinColumn({ name: 'TypeDocumentID' })
  typeDocument: TypeDocument;
}