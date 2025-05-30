import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository }       from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JournalEntree }    from './journal-entree.entity';

@Injectable()
export class JournalEntreeService {
  constructor(
    @InjectRepository(JournalEntree)
    private repo: Repository<JournalEntree>
  ) {}

  findAllForPatient(patientUuid: string) {
    return this.repo.find({ where: { patientUuid } });
  }

  findOne(id: number): Promise<JournalEntree> {
    return this.repo.findOneBy({ id })
      .then(e => e ?? Promise.reject(new NotFoundException()));
  }

  create(entry: Partial<JournalEntree>) {
    return this.repo.save(entry);
  }

  update(id: number, entry: Partial<JournalEntree>) {
    return this.findOne(id)
      .then(() => this.repo.update(id, entry));
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
