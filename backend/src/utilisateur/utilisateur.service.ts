import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository }    from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Utilisateur }   from './utilisateur.entity';

@Injectable()
export class UtilisateurService {
  constructor(
    @InjectRepository(Utilisateur)
    private repo: Repository<Utilisateur>,
  ) {}

  findAll() { return this.repo.find(); }
  findOne(uuid: string) {
    return this.repo.findOneBy({ uuid })
      .then(u => u ?? Promise.reject(new NotFoundException()));
  }
    findByEmail(email: string): Promise<Utilisateur | null> {
    return this.repo.findOne({ where: { email } });
  }
  create(u: Partial<Utilisateur>) { return this.repo.save(u); }
  update(uuid: string, u: Partial<Utilisateur>) {
    return this.findOne(uuid).then(() => this.repo.update(uuid, u));
  }
  remove(uuid: string) { return this.repo.delete(uuid); }
}
