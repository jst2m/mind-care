import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard }      from '../auth/jwt-auth.guard';
import { UtilisateurService }   from './utilisateur.service';

@Controller('utilisateur')
@UseGuards(JwtAuthGuard)
export class UtilisateurController {
  constructor(private svc: UtilisateurService) {}

  @Get() findAll() { return this.svc.findAll(); }

  @Get(':uuid') findOne(@Param('uuid') uuid: string) {
    return this.svc.findOne(uuid);
  }

  @Post() create(@Body() u) { return this.svc.create(u); }

  @Put(':uuid') update(@Param('uuid') uuid: string, @Body() u) {
    return this.svc.update(uuid,u);
  }

  @Delete(':uuid') remove(@Param('uuid') uuid: string) {
    return this.svc.remove(uuid);
  }
}
