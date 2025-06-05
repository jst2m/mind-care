// src/utilisateur/utilisateur.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UtilisateurService } from "./utilisateur.service";

@Controller("utilisateur")
@UseGuards(JwtAuthGuard)
export class UtilisateurController {
  constructor(private svc: UtilisateurService) {}

  @Get()
  findAll() {
    return this.svc.findAll();
  }

  @Get(":uuid")
  findOne(@Param("uuid") uuid: string) {
    return this.svc.findOne(uuid);
  }

  @Post()
  create(@Body() u: any) {
    return this.svc.create(u);
  }

  @Put(":uuid")
  // `update` renvoie maintenant l’utilisateur à jour (avec relations),
  // grâce à la modification dans le service
  update(@Param("uuid") uuid: string, @Body() u: any) {
    return this.svc.update(uuid, u);
  }

  @Delete(":uuid")
  remove(@Param("uuid") uuid: string) {
    return this.svc.remove(uuid);
  }
}
