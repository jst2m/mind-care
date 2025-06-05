import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Patient } from "../patient/patient.entity";

@Entity("journal_entree")
export class JournalEntree {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("char", { length: 36 })
  patientUuid: string;

  @ManyToOne(() => Patient, (patient) => patient.journalEntrees, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "patientUuid" })
  patient: Patient;

  @CreateDateColumn({ type: "timestamp" })
  dateJournal: Date;

  @Column({ type: "varchar", length: 255, nullable: true, default: "" })
  titre: string;

  @Column({ type: "text", nullable: true })
  contenu: string;

  @Column({ type: "int", nullable: false })
  humeur: number;

  @Column({ type: "varchar", length: 255, nullable: true, default: "" })
  tags: string;

  @Column({ type: "boolean", default: false })
  confidentiel: boolean;

  @UpdateDateColumn({ type: "timestamp" })
  dateMaj: Date;
}
