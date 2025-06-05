// src/professionnel/professionnel.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professionnel } from './professionnel.entity';
import { ProfessionnelService } from './professionnel.service';
import { ProfessionnelController } from './professionnel.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Professionnel]),
    AuthModule, 
  ],
  providers: [ProfessionnelService],
  controllers: [ProfessionnelController],
})
export class ProfessionnelModule {}
