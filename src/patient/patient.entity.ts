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

    @Column('varbinary', {
    length: 8192,
    nullable: true,
    transformer: new AesTransformer(process.env.AES_SECRET || '88b7b9f428d7e1130ab88243db97df8c3fe4dcd7184da29502991a72bd80aa48'),
  })

  @CreateDateColumn({ name: 'date_creation' })
  dateCreation: Date;

  @UpdateDateColumn({ name: 'date_maj' })
  dateMaj: Date;

  @OneToOne(() => Utilisateur, u => u.patient)
  @JoinColumn({ name: 'uuid' })
  utilisateur: Utilisateur;
}
