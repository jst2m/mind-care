import { Module }            from '@nestjs/common';
import { TypeOrmModule }     from '@nestjs/typeorm';
import { RendezVous }        from './rendez-vous.entity';
import { RendezVousService } from './rendez-vous.service';
import { RendezVousController } from './rendez-vous.controller';
import { AuthModule }        from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RendezVous]),
    AuthModule,
  ],
  providers: [RendezVousService],
  controllers: [RendezVousController],
})
export class RendezVousModule {}
