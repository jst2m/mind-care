import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Patient }        from '../patient/patient.entity';
import { Professionnel }  from '../professionnel/professionnel.entity';

@Entity()
export class RendezVous {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('char', { length: 36, name: 'patient_uuid' })
  patientUuid: string;

  @Column('char', { length: 36, name: 'professionnel_uuid' })
  professionnelUuid: string;

  @Column({ type: 'timestamp', name: 'date_programmee' })
  dateProgrammee: Date;

  @Column({ type: 'enum', enum: ['scheduled','done','cancelled'], default: 'scheduled' })
  statut: string;

  @Column({ nullable: true })
  motif?: string;

  @CreateDateColumn({ name: 'date_creation' })
  dateCreation: Date;

  @UpdateDateColumn({ name: 'date_maj' })
  dateMaj: Date;

  @ManyToOne(() => Patient, { onDelete: 'CASCADE' })
  patient: Patient;

  @ManyToOne(() => Professionnel, { onDelete: 'CASCADE' })
  professionnel: Professionnel;
}
