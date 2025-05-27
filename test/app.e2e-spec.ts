import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Auth & Protected Routes (e2e)', () => {
  let app: INestApplication;
  let jwt: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  it('/auth/signup (POST) → 201 & retourne user', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: 'test1@example.com',
        motDePasse: 'MonPass123!',
        prenom: 'Test',
        nom: 'User',
        dateNaissance: '1990-01-01',
        sexe: 'Homme',
        role: 'patient',
      })
      .expect(201)
      .then(res => {
        expect(res.body).toHaveProperty('uuid');
        expect(res.body.email).toBe('test1@example.com');
      });
  });

  it('/auth/login (POST) → 200 & retourne token', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test1@example.com', motDePasse: 'MonPass123!' })
      .expect(200)
      .then(res => {
        expect(res.body).toHaveProperty('accessToken');
        jwt = res.body.accessToken;
      });
  });

  it('/patient (GET) → 401 sans JWT', () => {
    return request(app.getHttpServer())
      .get('/patient')
      .expect(401);
  });

  it('/patient (GET) → 200 avec JWT', () => {
    return request(app.getHttpServer())
      .get('/patient')
      .set('Authorization', `Bearer ${jwt}`)
      .expect(200)
      .then(res => {
        // selon impl, patient peut être vide ou créé au signup
        expect(res.body).toBeDefined();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
