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

  async findOrCreateByUserUuid(userUuid: string): Promise<Patient> {
    let patient = await this.repo.findOneBy({ uuid: userUuid });
    if (!patient) {
      patient = this.repo.create({ uuid: userUuid });
      await this.repo.save(patient);
    }
    return patient;
  }


  findOne(uuid: string): Promise<Patient> {
    return this.repo.findOneBy({ uuid })
      .then(p => p ?? Promise.reject(new NotFoundException()));
  }


  upsert(data: Partial<Patient>): Promise<Patient> {
    return this.repo.save(data);
  }
}
