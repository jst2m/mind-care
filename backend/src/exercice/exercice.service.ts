import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository }     from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercice }       from './exercice.entity';

@Injectable()
export class ExerciceService {
  constructor(
    @InjectRepository(Exercice)
    private repo: Repository<Exercice>
  ) {}

  findAll(): Promise<Exercice[]> {
    return this.repo.find();
  }

  findOne(id: number): Promise<Exercice> {
    return this.repo.findOneBy({ id })
      .then(e => e ?? Promise.reject(new NotFoundException()));
  }

  create(ex: Partial<Exercice>) {
    return this.repo.save(ex);
  }

  update(id: number, ex: Partial<Exercice>) {
    return this.findOne(id)
      .then(() => this.repo.update(id, ex));
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
