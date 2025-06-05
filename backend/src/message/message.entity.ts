// src/message/message.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Utilisateur } from '../utilisateur/utilisateur.entity';

@Entity('message')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('char', { length: 36, name: 'de_uuid' })
  deUuid: string;

  @Column('char', { length: 36, name: 'a_uuid' })
  aUuid: string;

  @CreateDateColumn({ name: 'date_envoi' })
  dateEnvoi: Date;

  @Column('varbinary', { length: 4096, name: 'contenu' })
  contenu: Buffer;


  @ManyToOne(() => Utilisateur, (user) => user.messagesEnvoyes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'de_uuid' })
  emetteur: Utilisateur;

  
  @ManyToOne(() => Utilisateur, (user) => user.messagesRecus, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'a_uuid' })
  destinataire: Utilisateur;
}
