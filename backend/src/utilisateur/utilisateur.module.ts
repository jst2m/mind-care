import { Module }            from '@nestjs/common';
import { TypeOrmModule }     from '@nestjs/typeorm';
import { UtilisateurService }    from './utilisateur.service';
import { UtilisateurController } from './utilisateur.controller';
import { Utilisateur }       from './utilisateur.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Utilisateur])],
  providers: [UtilisateurService],
  controllers: [UtilisateurController],
  exports: [UtilisateurService],
})
export class UtilisateurModule {}
