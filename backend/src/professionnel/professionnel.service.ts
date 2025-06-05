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

  /** Récupère un pro par uuid */
  findOne(uuid: string): Promise<Professionnel> {
    return this.repo
      .findOneBy({ uuid })
      .then((p) => p ?? Promise.reject(new NotFoundException()));
  }

  /** Ajoute ou met à jour un pro */
  upsert(pro: Partial<Professionnel>): Promise<Professionnel> {
    return this.repo.save(pro);
  }

  /** Liste tous les professionnels, avec un filtre “search” optionnel */
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
