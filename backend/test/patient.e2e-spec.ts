// test/patient.e2e-spec.ts
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Patient CRUD (e2e)', () => {
  let app: INestApplication;
  let jwt: string;

  beforeAll(async () => {
    const m: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = m.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    // on s’authentifie une fois pour récupérer le token
    const login = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test1@example.com', motDePasse: 'MonPass123!' });
    jwt = login.body.accessToken;
  });

  it('PUT /patient → crée ou met à jour', () =>
    request(app.getHttpServer())
      .put('/patient')
      .set('Authorization', `Bearer ${jwt}`)
      .send({ allergies: ['pollen'], antecedents: { diabete: false } })
      .expect(200)
      .then(r => {
        expect(r.body).toHaveProperty('uuid');
        expect(r.body.donneesMedicales).toBeDefined();
      }));

  afterAll(async () => await app.close());
});
