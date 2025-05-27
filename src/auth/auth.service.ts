import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository }   from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService }   from '@nestjs/jwt';
import * as bcrypt      from 'bcrypt';

import { Utilisateur } from '../utilisateur/utilisateur.entity';
import { SignupDto }    from './dto/signup.dto';
import { LoginDto }     from './dto/login.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Utilisateur)
    private repo: Repository<Utilisateur>,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: SignupDto) {
    const exists = await this.repo.findOneBy({ email: dto.email });
    if (exists) throw new UnauthorizedException('Email déjà utilisé');
    const user = this.repo.create({
      uuid: uuidv4(),
      email: dto.email,
      motDePasse: await bcrypt.hash(dto.motDePasse, 10),
      prenom: dto.prenom,
      nom: dto.nom,
      dateNaissance: dto.dateNaissance ? new Date(dto.dateNaissance) : undefined,
      sexe: dto.sexe,
      role: dto.role,
    });
    return this.repo.save(user);
  }
    /** Hash un mot de passe en clair */
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  /** Compare mot de passe en clair / hash */
  async compare(raw: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(raw, hashed);
  }

  async signIn(dto: LoginDto) {
    const user = await this.repo.findOneBy({ email: dto.email });
    if (!user || !(await bcrypt.compare(dto.motDePasse, user.motDePasse))) {
      throw new UnauthorizedException('Identifiants invalides');
    }
    const payload = { sub: user.uuid, role: user.role };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
