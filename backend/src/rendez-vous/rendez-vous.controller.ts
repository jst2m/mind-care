// src/rendez-vous/rendez-vous.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RendezVousService } from './rendez-vous.service';
import { RendezVous } from './rendez-vous.entity';

@Controller('rendez-vous')
@UseGuards(JwtAuthGuard)
export class RendezVousController {
  constructor(private readonly svc: RendezVousService) {}


  @Get('pro/:proUuid')
  async getByProfessionnel(
    @Param('proUuid') proUuid: string,
  ): Promise<RendezVous[]> {
    return this.svc.findByProfessionnel(proUuid);
  }


  @Get('me')
  async getByPatient(@Request() req): Promise<RendezVous[]> {
    const patientUuid = req.user.uuid;
    return this.svc.findByPatient(patientUuid);
  }


  @Post()
  async create(
    @Request() req,
    @Body()
    body: {
      professionnelUuid: string;
      dateProgrammee: string; 
      motif?: string;
    },
  ): Promise<RendezVous> {
    const patientUuid = req.user.uuid;
    const { professionnelUuid, dateProgrammee, motif } = body;

    if (!professionnelUuid || !dateProgrammee) {
      throw new BadRequestException(
        'Il faut fournir professionnelUuid et dateProgrammee',
      );
    }

    const date = new Date(dateProgrammee);
    if (isNaN(date.getTime())) {
      throw new BadRequestException('dateProgrammee invalide');
    }

    return this.svc.createRendezVous(
      patientUuid,
      professionnelUuid,
      date,
      motif ?? null,
    );
  }
}
