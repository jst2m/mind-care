import { Module }                  from '@nestjs/common';
import { TypeOrmModule }           from '@nestjs/typeorm';
import { JournalEntree }           from './journal-entree.entity';
import { JournalEntreeService }    from './journal-entree.service';
import { JournalEntreeController } from './journal-entree.controller';
import { AuthModule }              from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([JournalEntree]),
    AuthModule,
  ],
  providers: [JournalEntreeService],
  controllers: [JournalEntreeController],
})
export class JournalEntreeModule {}
