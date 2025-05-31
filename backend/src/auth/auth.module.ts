// backend/src/auth/auth.module.ts

import { Module }               from '@nestjs/common';
import { TypeOrmModule }        from '@nestjs/typeorm';
import { JwtModule }            from '@nestjs/jwt';
import { PassportModule }       from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService }          from './auth.service';
import { AuthController }       from './auth.controller';
import { JwtStrategy }          from './jwt.strategy';

import { Utilisateur }          from '../utilisateur/utilisateur.entity';
import { Patient }              from '../patient/patient.entity';
import { Professionnel }        from '../professionnel/professionnel.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Utilisateur, Patient, Professionnel]),

    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject:  [ConfigService],
      useFactory: (cs: ConfigService) => ({
        secret: cs.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: cs.get<string>('JWT_EXPIRATION') },
      }),
    }),

    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
