import {
  Controller, Get, Post, Put, Delete,
  Param, Body, UseGuards, Request
} from '@nestjs/common';
import { JwtAuthGuard }             from '../auth/jwt-auth.guard';
import { JournalEntreeService }     from './journal-entree.service';
import { JournalEntree }            from './journal-entree.entity';

@Controller('journal-entree')
@UseGuards(JwtAuthGuard)
export class JournalEntreeController {
  constructor(private svc: JournalEntreeService) {}

  @Get()
  list(@Request() req): Promise<JournalEntree[]> {
    return this.svc.findAllForPatient(req.user.uuid);
  }

  @Post()
  create(@Request() req, @Body() body: Partial<JournalEntree>) {
    return this.svc.create({ patientUuid: req.user.uuid, ...body });
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
