import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Utilisateur } from '../utilisateur/utilisateur.entity';

@Entity()
export class Patient {
  @PrimaryColumn('char', { length: 36 })
  uuid: string;

  @Column('varbinary', { length: 16384, nullable: true })
  donneesMedicales?: Buffer;

  @CreateDateColumn({ name: 'date_creation' })
  dateCreation: Date;

  @UpdateDateColumn({ name: 'date_maj' })
  dateMaj: Date;

  @OneToOne(() => Utilisateur, u => u.patient)
  @JoinColumn({ name: 'uuid' })
  utilisateur: Utilisateur;
}
