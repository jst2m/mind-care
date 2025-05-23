import { Module }          from '@nestjs/common';
import { TypeOrmModule }   from '@nestjs/typeorm';
import { Patient }         from './patient.entity';
import { PatientService }  from './patient.service';
import { PatientController } from './patient.controller';
import { AuthModule }      from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient]),
    AuthModule,  // pour JwtAuthGuard si besoin
  ],
  providers: [PatientService],
  controllers: [PatientController],
})
export class PatientModule {}
