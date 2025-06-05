// src/rendez-vous/rendez-vous.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RendezVous } from './rendez-vous.entity';

@Injectable()
export class RendezVousService {
  constructor(
    @InjectRepository(RendezVous)
    private readonly repo: Repository<RendezVous>,
  ) {}

 
  async findByProfessionnel(proUuid: string): Promise<RendezVous[]> {
    return this.repo.find({
      where: { professionnelUuid: proUuid },
      order: { dateProgrammee: 'ASC' },
    });
  }

  
  async findByPatient(patientUuid: string): Promise<RendezVous[]> {
    return this.repo.find({
      where: { patientUuid },
      order: { dateProgrammee: 'ASC' },
    });
  }

  
  async createRendezVous(
    patientUuid: string,
    professionnelUuid: string,
    dateProgrammee: Date,
    motif?: string | null,
  ): Promise<RendezVous> {
    const rv = this.repo.create({
      patientUuid,
      professionnelUuid,
      dateProgrammee,
      motif: motif ?? undefined,
    });

    return this.repo.save(rv);
  }

 
  async findOne(id: number): Promise<RendezVous> {
    const rv = await this.repo.findOneBy({ id });
    if (!rv) {
      throw new NotFoundException(`RendezVous ${id} introuvable`);
    }
    return rv;
  }

  
  async update(
    id: number,
    data: Partial<RendezVous>,
  ): Promise<RendezVous> {
    await this.findOne(id);
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  
  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
