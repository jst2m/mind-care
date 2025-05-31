// backend/src/journal-entree/journal-entree.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Patient } from '../patient/patient.entity';

@Entity('journal_entree')
@Index(['patientUuid', 'dateJournal'])
export class JournalEntree {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('char', { length: 36, name: 'patient_uuid' })
  patientUuid: string;

  // Remplace @CreateDateColumn par un @Column avec default CURRENT_TIMESTAMP
  @Column({
    type: 'timestamp',
    name: 'date_journal',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateJournal: Date;

  @Column()
  titre: string;

  @Column('text')
  contenu: string;

  @Column({ type: 'tinyint', nullable: true })
  humeur?: number;

  @Column({ type: 'json', nullable: true })
  tags?: any;

  @Column({ type: 'boolean', default: false })
  confidentiel: boolean;

  @UpdateDateColumn({ name: 'date_maj' })
  dateMaj: Date;

  @ManyToOne(() => Patient, p => p.uuid, { onDelete: 'CASCADE' })
  patient: Patient;
}
