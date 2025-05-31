import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository }              from '@nestjs/typeorm';
import { Repository }                    from 'typeorm';
import { Patient }                       from './patient.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly repo: Repository<Patient>,
  ) {}

  /**
   * Récupère un patient à partir de son UUID.
   * Jette NotFoundException si aucun résultat.
   */
  async findOne(uuid: string): Promise<Patient> {
    const patient = await this.repo.findOneBy({ uuid });
    if (!patient) {
      throw new NotFoundException(`Patient ${uuid} introuvable`);
    }
    return patient;
  }

  /**
   * Met à jour (ou crée) le patient passé en argument.
   * Ici on suppose que l'UUID existe toujours ;
   * on jette si le patient n'existe pas encore.
   */
  async upsert(data: Partial<Patient> & { uuid: string }): Promise<Patient> {
    // Vérifie d'abord que le patient existe
    await this.findOne(data.uuid);
    // Puis mets à jour
    await this.repo.update({ uuid: data.uuid }, data);
    // Recharge et renvoie
    return this.findOne(data.uuid);
  }
}
