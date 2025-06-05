// src/patient/patient.entity.ts

import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Utilisateur } from "../utilisateur/utilisateur.entity";
import { JournalEntree } from "../journal-entree/journal-entree.entity";
import { RendezVous } from "../rendez-vous/rendez-vous.entity"; 

@Entity("patient")
export class Patient {
  @PrimaryColumn("char", { length: 36 })
  uuid: string;

  @Column({ length: 100 })
  firstname: string;

  @Column({ length: 100 })
  lastname: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn({ name: "date_creation" })
  dateCreation: Date;

  @UpdateDateColumn({ name: "date_maj" })
  dateMaj: Date;

  // Relation OneToOne inverse vers Utilisateur
  @OneToOne(() => Utilisateur, (u) => u.patient)
  @JoinColumn({ name: "uuid" })
  utilisateur: Utilisateur;

  @OneToMany(() => JournalEntree, (je) => je.patient)
  journalEntrees: JournalEntree[];


  @OneToMany(() => RendezVous, (rv) => rv.patient)
  rendezVous: RendezVous[];
}
