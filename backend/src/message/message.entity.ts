import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Utilisateur } from '../utilisateur/utilisateur.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('char', { length: 36, name: 'de_uuid' })
  deUuid: string;

  @Column('char', { length: 36, name: 'a_uuid' })
  aUuid: string;

  @CreateDateColumn({ name: 'date_envoi' })
  dateEnvoi: Date;

  @Column('varbinary', { length: 4096 })
  contenu: Buffer;

  @ManyToOne(() => Utilisateur, { onDelete: 'CASCADE' })
  emetteur: Utilisateur;

  @ManyToOne(() => Utilisateur, { onDelete: 'CASCADE' })
  destinataire: Utilisateur;
}
