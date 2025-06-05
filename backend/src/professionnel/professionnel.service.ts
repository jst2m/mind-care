// src/professionnel/professionnel.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Professionnel } from './professionnel.entity';

@Injectable()
export class ProfessionnelService {
  constructor(
    @InjectRepository(Professionnel)
    private repo: Repository<Professionnel>,
  ) {}

  async findOne(uuid: string): Promise<Professionnel> {
    const pro = await this.repo.findOne({
      where: { uuid },
      relations: ['utilisateur'],
    });
    if (!pro) {
      throw new NotFoundException(`Professionnel ${uuid} introuvable`);
    }
    return pro;
  }

  upsert(pro: Partial<Professionnel>): Promise<Professionnel> {
    return this.repo.save(pro);
  }


  async searchAll(search?: string): Promise<Professionnel[]> {
    const qb = this.repo
      .createQueryBuilder('pro')
      .leftJoinAndSelect('pro.utilisateur', 'u');

    if (search && search.trim().length > 0) {
      const term = `%${search.trim().toLowerCase()}%`;
      qb.andWhere(
        '(LOWER(u.prenom) LIKE :term OR LOWER(u.nom) LIKE :term OR LOWER(pro.specialite) LIKE :term)',
        { term },
      );
    }

    return qb.getMany();
  }
}
