import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository }      from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RendezVous }       from './rendez-vous.entity';

@Injectable()
export class RendezVousService {
  constructor(
    @InjectRepository(RendezVous)
    private repo: Repository<RendezVous>
  ) {}

  findAll(): Promise<RendezVous[]> {
    return this.repo.find();
  }

  findOne(id: number): Promise<RendezVous> {
    return this.repo.findOneBy({ id })
      .then(r => r ?? Promise.reject(new NotFoundException()));
  }

  create(rdv: Partial<RendezVous>) {
    return this.repo.save(rdv);
  }

  update(id: number, rdv: Partial<RendezVous>) {
    return this.findOne(id)
      .then(() => this.repo.update(id, rdv));
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
