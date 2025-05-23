import { Module }            from '@nestjs/common';
import { JwtModule }         from '@nestjs/jwt';
import { PassportModule }    from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule }     from '@nestjs/typeorm';

import { AuthService }       from './auth.service';
import { AuthController }    from './auth.controller';
import { JwtStrategy }       from './jwt.strategy';
import { Utilisateur }       from '../utilisateur/utilisateur.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Utilisateur]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject:  [ConfigService],
      useFactory: (cs: ConfigService) => ({
        secret: cs.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: cs.get<string>('JWT_EXPIRATION') },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
