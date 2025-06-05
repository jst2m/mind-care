// src/journal-entree/journal-entree.module.ts
import { Module }               from '@nestjs/common';
import { TypeOrmModule }        from '@nestjs/typeorm';
import { JournalEntree }        from './journal-entree.entity';
import { JournalEntreeService } from './journal-entree.service';
import { JournalEntreeController } from './journal-entree.controller';
import { PatientModule }        from '../patient/patient.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([JournalEntree]),
    PatientModule,     
  ],
  providers: [JournalEntreeService],
  controllers: [JournalEntreeController],
})
export class JournalEntreeModule {}
