// src/utilisateur/utilisateur.service.ts

import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Utilisateur } from "./utilisateur.entity";

@Injectable()
export class UtilisateurService {
  constructor(
    @InjectRepository(Utilisateur)
    private repo: Repository<Utilisateur>,
  ) {}

  findAll() {
    // (on peut aussi charger la relation patient si besoin, mais pas obligatoire ici)
    return this.repo.find();
  }

  async findOne(uuid: string) {
    // On charge la relation 'patient' via `relations: ['patient']`, 
    // pour que user.telephone, user.adresse, etc. soient bien récupérés
    const u = await this.repo.findOne({
      where: { uuid },
      relations: ["patient"],
    });
    if (!u) {
      throw new NotFoundException(`Utilisateur ${uuid} introuvable`);
    }
    return u;
  }

  findByEmail(email: string): Promise<Utilisateur | null> {
    return this.repo.findOne({ where: { email } });
  }

  create(u: Partial<Utilisateur>) {
    return this.repo.save(u);
  }

  async update(uuid: string, u: Partial<Utilisateur>) {
    // Vérifie d’abord que l’utilisateur existe
    await this.findOne(uuid);
    // Puis applique les mises à jour :
    await this.repo.update(uuid, u);
    // Enfin, on renvoie l’utilisateur complet (avec ses relations) pour la réponse
    return this.findOne(uuid);
  }

  remove(uuid: string) {
    return this.repo.delete(uuid);
  }
}
