import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard }          from '../auth/jwt-auth.guard';
import { JournalEntreeService }  from './journal-entree.service';
import { PatientService }        from '../patient/patient.service';
import { JournalEntree }         from './journal-entree.entity';
import { Patient }               from '../patient/patient.entity';

@Controller('journal-entree')
@UseGuards(JwtAuthGuard)
export class JournalEntreeController {
  constructor(
    private readonly svc: JournalEntreeService,
    private readonly patientSvc: PatientService, // ← on injecte PatientService ici
  ) {}

  @Get()
  list(@Request() req): Promise<JournalEntree[]> {
    // req.user.uuid contient l’UUID du patient grâce à JwtAuthGuard
    return this.svc.findAllForPatient(req.user.uuid);
  }

  @Post()
  async create(@Request() req, @Body() body: Partial<JournalEntree>) {
    // 1) S’assurer qu’il existe un Patient pour cet UUID utilisateur
    //    (findOrCreateByUserUuid renvoie un objet Patient complet)
    const patient: Patient = await this.patientSvc.findOrCreateByUserUuid(req.user.uuid);

    // 2) Construire l’entrée à sauver
    //    On passe directement l’entité Patient (pas { uuid: ... }).
    const entry: Partial<JournalEntree> = {
      patient,                         // ↪︎ on fournit l’objet Patient complet
      titre:        body.titre       ?? '',
      contenu:      body.contenu     ?? '',
      humeur:       body.humeur      ?? 1,
      tags:         body.tags        ?? '',
      confidentiel: body.confidentiel ?? false,
    };

    return this.svc.create(entry);
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.svc.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: Partial<JournalEntree>) {
    return this.svc.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.svc.remove(id);
  }
}
