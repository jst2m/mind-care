import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard }           from '../auth/jwt-auth.guard';
import { ProfessionnelService }   from './professionnel.service';
import { Professionnel }          from './professionnel.entity';

@Controller('professionnel')
@UseGuards(JwtAuthGuard)
export class ProfessionnelController {
  constructor(private svc: ProfessionnelService) {}

  @Get()
  getProfile(@Request() req): Promise<Professionnel> {
    return this.svc.findOne(req.user.uuid);
  }

  @Put()
  updateProfile(
    @Request() req,
    @Body() body: Partial<Professionnel>,
  ): Promise<Professionnel> {
    return this.svc.upsert({ uuid: req.user.uuid, ...body });
  }
}
