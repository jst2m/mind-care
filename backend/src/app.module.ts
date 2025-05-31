import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
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
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService): TypeOrmModuleOptions => ({
        type: 'mysql',
        host: cs.get<string>('DB_HOST'),
        port: cs.get<number>('DB_PORT'),
        username: cs.get<string>('DB_USERNAME'), // <-- ici
        password: cs.get<string>('DB_PASSWORD'), // <-- ici
        database: cs.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
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
