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
export class Professionnel {
  @PrimaryColumn('char', { length: 36 })
  uuid: string;

  @Column()
  specialite: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'telephone_pro', nullable: true })
  telephonePro?: string;

  @Column({ name: 'site_web', nullable: true })
  siteWeb?: string;

  @CreateDateColumn({ name: 'date_creation' })
  dateCreation: Date;

  @UpdateDateColumn({ name: 'date_maj' })
  dateMaj: Date;

  @OneToOne(() => Utilisateur, u => u.professionnel)
  @JoinColumn({ name: 'uuid' })
  utilisateur: Utilisateur;
}
