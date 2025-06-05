// backend/src/auth/auth.service.ts

import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository }           from 'typeorm';
import { InjectRepository }     from '@nestjs/typeorm';
import { JwtService }           from '@nestjs/jwt';
import * as bcrypt               from 'bcrypt';
import { v4 as uuidv4 }         from 'uuid';

import { Utilisateur }          from '../utilisateur/utilisateur.entity';
import { Patient }              from '../patient/patient.entity';
import { Professionnel }        from '../professionnel/professionnel.entity';
import { SignupDto }            from './dto/signup.dto';
import { LoginDto }             from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Utilisateur)
    private readonly userRepo: Repository<Utilisateur>,

    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>,

    @InjectRepository(Professionnel)
    private readonly proRepo: Repository<Professionnel>,

    private readonly jwtService: JwtService,
  ) {}

  async signUp(dto: SignupDto) {
    // 1) Vérifier qu’aucun utilisateur n'existe avec cet email
    const exists = await this.userRepo.findOneBy({ email: dto.email });
    if (exists) throw new UnauthorizedException('Email déjà utilisé');

    // 2) Créer et sauvegarder l’entité Utilisateur
    const userUuid = uuidv4();
    const hashedPwd = await bcrypt.hash(dto.motDePasse, 10);
    const newUser = this.userRepo.create({
      uuid:           userUuid,
      email:          dto.email,
      motDePasse:     hashedPwd,
      prenom:         dto.prenom,
      nom:            dto.nom,
      dateNaissance:  dto.dateNaissance ? new Date(dto.dateNaissance) : undefined,
      sexe:           dto.sexe,
      role:           dto.role,
    });

    const savedUser = await this.userRepo.save(newUser);

    // 3) Selon le rôle, créer une ligne dans Patient ou Professionnel
    if (dto.role === 'patient') {
      // Le patient hérite du même UUID que l’utilisateur
      const newPatient = this.patientRepo.create({
        uuid:      savedUser.uuid,
        firstname: dto.prenom,
        lastname:  dto.nom,
        email:     dto.email,
        // Les dates creation/maj seront automatiques via les décorateurs @CreateDateColumn / @UpdateDateColumn
      });
      try {
        await this.patientRepo.save(newPatient);
      } catch (err) {
        // Si jamais l’insertion échoue, on supprime l’utilisateur pour garder cohérence
        await this.userRepo.delete(savedUser.uuid);
        throw new InternalServerErrorException("Impossible de créer le patient");
      }
    } else if (dto.role === 'professionnel') {
      const newPro = this.proRepo.create({
        uuid:       savedUser.uuid,
        specialite: '',   
      });

      try {
        await this.proRepo.save(newPro);
      } catch (err) {
        // En cas d’erreur, rollback de l’utilisateur
        await this.userRepo.delete(savedUser.uuid);
        throw new InternalServerErrorException("Impossible de créer le professionnel");
      }
    }

    const payload = { sub: savedUser.uuid, role: savedUser.role };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        uuid:  savedUser.uuid,
        email: savedUser.email,
        prenom: savedUser.prenom,
        nom: savedUser.nom,
        role:  savedUser.role,
      },
    };
  }

  async signIn(dto: LoginDto) {
    const user = await this.userRepo.findOneBy({ email: dto.email });
    if (!user || !(await bcrypt.compare(dto.motDePasse, user.motDePasse))) {
      throw new UnauthorizedException('Identifiants invalides');
    }
    const payload = { sub: user.uuid, role: user.role };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
