import * as nodeCrypto from 'crypto';

// Polyfill pour éviter les erreurs "crypto undefined"
if (typeof globalThis.crypto === 'undefined') {
  (globalThis as any).crypto = nodeCrypto;
}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

// Importation des modules de l'application
import { AuthModule } from './auth/auth.module';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { PatientModule } from './patient/patient.module';
import { ProfessionnelModule } from './professionnel/professionnel.module';
import { JournalEntreeModule } from './journal-entree/journal-entree.module';
import { ExerciceModule } from './exercice/exercice.module';
import { RendezVousModule } from './rendez-vous/rendez-vous.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    // Charge les variables d'environnement depuis .env
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),

    // === Connexion 1 : base mobile (mind_care)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService): TypeOrmModuleOptions => ({
        type: 'mysql',
        host: cs.get<string>('DB_HOST'),
        port: cs.get<number>('DB_PORT'),
        username: cs.get<string>('DB_USERNAME'),
        password: cs.get<string>('DB_PASSWORD'),
        database: cs.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),

    // === Connexion 2 : base web (mind_care_web)
    TypeOrmModule.forRootAsync({
      name: 'webConnection', // identifiant de cette connexion
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService): TypeOrmModuleOptions => ({
        type: 'mysql',
        host: cs.get<string>('WEB_DB_HOST'),
        port: cs.get<number>('WEB_DB_PORT'),
        username: cs.get<string>('WEB_DB_USERNAME'),
        password: cs.get<string>('WEB_DB_PASSWORD'),
        database: cs.get<string>('WEB_DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),

    // Modules métiers (utilisent par défaut la 1re connexion)
    AuthModule,
    UtilisateurModule,
    PatientModule,
    ProfessionnelModule,
    JournalEntreeModule,
    ExerciceModule,
    RendezVousModule,
    MessageModule,
  ],
})
export class AppModule {}
