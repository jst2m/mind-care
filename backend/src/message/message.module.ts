import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    // ⚠️ Ajout du nom de connexion ici :
    TypeOrmModule.forFeature([Message], 'webConnection'),
    AuthModule,
  ],
  providers: [MessageService],
  controllers: [MessageController],
})
export class MessageModule {}
