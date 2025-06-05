/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(cs: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: cs.get<string>('JWT_SECRET') ?? 'default_secret_key',
    });
  }

  validate(payload: { sub: string; role: string }) {
    console.log('🔑 JwtStrategy.validate payload =', payload);
    return { uuid: payload.sub, role: payload.role };
  }
}
