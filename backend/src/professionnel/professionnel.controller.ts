// src/professionnel/professionnel.controller.ts

import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
  Request,
  Query,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProfessionnelService } from './professionnel.service';
import { Professionnel } from './professionnel.entity';

// …imports…
@Controller('professionnels')
@UseGuards(JwtAuthGuard)
export class ProfessionnelController {
  constructor(private svc: ProfessionnelService) {}

  @Get()
  async findAll(@Query('search') search?: string): Promise<Professionnel[]> {
    return this.svc.searchAll(search);
  }

  @Get('me')
  getProfile(@Request() req): Promise<Professionnel> {
    return this.svc.findOne(req.user.uuid);
  }

  @Put('me')
  updateProfile(
    @Request() req,
    @Body() body: Partial<Professionnel>,
  ): Promise<Professionnel> {
    return this.svc.upsert({ uuid: req.user.uuid, ...body });
  }

  /** ← Cette méthode doit exister pour tout UUID arbitraire */
  @Get(':uuid')
  getByUuid(@Param('uuid') uuid: string): Promise<Professionnel> {
    return this.svc.findOne(uuid);
  }
}

