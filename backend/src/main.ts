import * as nodeCrypto from 'crypto';

const crypto = require('crypto').webcrypto;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  console.log('>> JWT_SECRET:', configService.get<string>('JWT_SECRET'));

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  app.use((req, res, next) => {
    console.log('🔍 Incoming headers:', req.headers);
    next();
  });

  app.listen(3000, '0.0.0.0', () => {
    console.log('Backend running on http://0.0.0.0:3000');
  });
}

bootstrap();
