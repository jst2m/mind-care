import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository }      from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Professionnel }   from './professionnel.entity';

@Injectable()
export class ProfessionnelService {
  constructor(
    @InjectRepository(Professionnel)
    private repo: Repository<Professionnel>
  ) {}

  findOne(uuid: string): Promise<Professionnel> {
    return this.repo.findOneBy({ uuid })
      .then(p => p ?? Promise.reject(new NotFoundException()));
  }

  upsert(pro: Partial<Professionnel>): Promise<Professionnel> {
    return this.repo.save(pro);
  }
}
