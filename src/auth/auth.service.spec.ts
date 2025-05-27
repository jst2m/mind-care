import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken }       from '@nestjs/typeorm';
import { JwtService }              from '@nestjs/jwt';
import { AuthService }             from './auth.service';
import { Utilisateur }             from '../utilisateur/utilisateur.entity';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: Partial<JwtService>;
  let userRepo: any;

  beforeEach(async () => {
    jwtService = { sign: jest.fn().mockReturnValue('token-fake') };
    userRepo = {
      findOneBy: jest.fn(),      // ← on mocke findOneBy
      create:    jest.fn(),
      save:      jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: jwtService },
        { provide: getRepositoryToken(Utilisateur), useValue: userRepo },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  describe('signUp', () => {
    it('crée et renvoie un utilisateur', async () => {
      // Arrange
      userRepo.findOneBy.mockResolvedValue(null);      // pas d’utilisateur existant
      userRepo.create.mockReturnValue({ email: 'a' });
      userRepo.save.mockResolvedValue({ uuid: '1', email: 'a' });

      // Act
      const dto = { email: 'a', motDePasse: 'pass' } as any;
      const result = await service.signUp(dto);

      // Assert
      expect(userRepo.findOneBy).toHaveBeenCalledWith({ email: 'a' });
      expect(userRepo.create).toHaveBeenCalled();
      expect(userRepo.save).toHaveBeenCalled();
      expect(result).toMatchObject({ uuid: '1', email: 'a' });
    });
  });

  describe('signIn', () => {
    it('renvoie un token sur bons identifiants', async () => {
      // Arrange
      const fakeUser = { motDePasse: await service.hashPassword('pass') };
      userRepo.findOneBy.mockResolvedValue(fakeUser);

      // Act
      const dto = { email: 'a', motDePasse: 'pass' } as any;
      const result = await service.signIn(dto);

      // Assert
      expect(userRepo.findOneBy).toHaveBeenCalledWith({ email: 'a' });
      expect(result).toHaveProperty('accessToken', 'token-fake');
    });
  });
});
