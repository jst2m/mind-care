import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard }      from '../auth/jwt-auth.guard';
import { PatientService }    from './patient.service';
import { Patient }           from './patient.entity';

@Controller('patient')
@UseGuards(JwtAuthGuard)
export class PatientController {
  constructor(private readonly svc: PatientService) {}

  @Get()
  getProfile(@Request() req): Promise<Patient> {
    return this.svc.findOne(req.user.uuid);
  }

  @Put()
  updateProfile(
    @Request() req,
    @Body() body: Partial<Patient>,
  ): Promise<Patient> {
    return this.svc.upsert({ uuid: req.user.uuid, ...body });
  }
}

