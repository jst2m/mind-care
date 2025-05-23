import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Patient } from '../patient/patient.entity';

@Entity()
@Index(['patientUuid', 'dateJournal'])
export class JournalEntree {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('char', { length: 36, name: 'patient_uuid' })
  patientUuid: string;

  @Column({ type: 'date', name: 'date_journal' })
  dateJournal: string;

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

  @CreateDateColumn({ name: 'date_creation' })
  dateCreation: Date;

  @UpdateDateColumn({ name: 'date_maj' })
  dateMaj: Date;

  @ManyToOne(() => Patient, p => p.uuid, { onDelete: 'CASCADE' })
  patient: Patient;
}
