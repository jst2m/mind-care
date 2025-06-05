// src/utilisateur/utilisateur.entity.ts

import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  OneToMany,    
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Patient } from '../patient/patient.entity';
import { Professionnel } from '../professionnel/professionnel.entity';
import { Message } from '../message/message.entity'; 

@Entity()
export class Utilisateur {
  @PrimaryColumn('char', { length: 36 }) 
  uuid: string;

  @Column({ unique: true }) email: string;
  @Column()               motDePasse: string;
  @Column()               prenom: string;
  @Column()               nom: string;
  @Column({ type: 'date', nullable: true }) dateNaissance?: Date;
  @Column({ nullable: true }) telephone?: string;
  @Column({ nullable: true }) adresse?: string;
  @Column({ nullable: true }) codePostal?: string;
  @Column({ nullable: true }) ville?: string;
  @Column({ type: 'enum', enum: ['Homme','Femme','Ne préfère pas dire'] })
                          sexe: string;
  @Column({ type: 'enum', enum: ['patient','professionnel'] })
                          role: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
                          dateCreation: Date;

  @OneToOne(() => Patient, p => p.utilisateur)
  patient: Patient;

  @OneToOne(() => Professionnel, pr => pr.utilisateur)
  professionnel: Professionnel;

  
  @OneToMany(() => Message, message => message.emetteur)
  messagesEnvoyes: Message[];

  
  @OneToMany(() => Message, message => message.destinataire)
  messagesRecus: Message[];
}
