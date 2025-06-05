// src/rendez-vous/rendez-vous.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Patient } from '../patient/patient.entity';
import { Professionnel } from '../professionnel/professionnel.entity';

@Entity('rendez_vous')
export class RendezVous {
  @PrimaryGeneratedColumn()
  id: number;


  @Column('char', { length: 36, name: 'patient_uuid' })
  patientUuid: string;


  @Column('char', { length: 36, name: 'professionnel_uuid' })
  professionnelUuid: string;


  @Column({ type: 'datetime', name: 'date_programmee' })
  dateProgrammee: Date;


  @Column({
    type: 'enum',
    enum: ['scheduled', 'done', 'cancelled'],
    default: 'scheduled',
  })
  statut: 'scheduled' | 'done' | 'cancelled';

 
  @Column({ type: 'text', nullable: true })
  motif: string | null;

 
  @CreateDateColumn({ name: 'date_creation' })
  dateCreation: Date;

  @UpdateDateColumn({ name: 'date_maj' })
  dateMaj: Date;


  @ManyToOne(() => Patient, (patient) => patient.rendezVous, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'patient_uuid' })
  patient: Patient;


  @ManyToOne(
    () => Professionnel,
    (professionnel) => professionnel.rendezVous,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'professionnel_uuid' })
  professionnel: Professionnel;
}
