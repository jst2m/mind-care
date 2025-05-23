import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository }     from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient }        from './patient.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private repo: Repository<Patient>
  ) {}

  findOne(uuid: string): Promise<Patient> {
    return this.repo.findOneBy({ uuid })
      .then(p => p ?? Promise.reject(new NotFoundException()));
  }

  upsert(patient: Partial<Patient>): Promise<Patient> {
    return this.repo.save(patient);
  }
}
