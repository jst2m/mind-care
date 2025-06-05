// src/patient/patient.module.ts
import { Module }            from '@nestjs/common';
import { TypeOrmModule }     from '@nestjs/typeorm';
import { Patient }           from './patient.entity';
import { PatientService }    from './patient.service';
import { PatientController } from './patient.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  providers: [PatientService],
  controllers: [PatientController],
  exports: [PatientService],  // <-- on exporte PatientService pour qu’il soit injecté ailleurs
})
export class PatientModule {}
