// backend/src/patient/patient.entity.ts
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
import { AesTransformer } from '../common/transformers/aes.transformer';


@Entity()
export class Patient {
  @PrimaryColumn('char', { length: 36 })
  uuid: string;

  @CreateDateColumn({ name: 'date_creation' })
  dateCreation: Date;

  @UpdateDateColumn({ name: 'date_maj' })
  dateMaj: Date;

  @OneToOne(() => Utilisateur, u => u.patient)
  @JoinColumn({ name: 'uuid' })
  utilisateur: Utilisateur;
}
