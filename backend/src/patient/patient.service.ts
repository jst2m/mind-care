// src/patient/patient.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository }       from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient }          from './patient.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly repo: Repository<Patient>,
  ) {}

  /**
   * Recherche en base le Patient dont uuid = userUuid ;
   * s’il n’existe pas, on le crée (avec uniquement l’UUID).
   */
  async findOrCreateByUserUuid(userUuid: string): Promise<Patient> {
    let patient = await this.repo.findOneBy({ uuid: userUuid });
    if (!patient) {
      // Création du nouveau patient (on conserve userUuid en tant que PK)
      patient = this.repo.create({ uuid: userUuid });
      await this.repo.save(patient);
    }
    return patient;
  }

  /**
   * Renvoie le Patient existant ou lève NotFoundException.
   */
  findOne(uuid: string): Promise<Patient> {
    return this.repo.findOneBy({ uuid })
      .then(p => p ?? Promise.reject(new NotFoundException()));
  }

  /**
   * Créé ou met à jour un Patient.
   */
  upsert(data: Partial<Patient>): Promise<Patient> {
    return this.repo.save(data);
  }
}
