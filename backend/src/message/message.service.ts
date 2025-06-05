// src/message/message.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly repo: Repository<Message>,
  ) {}


  async getConversation(
    uuidPatient: string,
    uuidPro: string,
  ): Promise<Message[]> {
    return this.repo.find({
      where: [
        { deUuid: uuidPatient, aUuid: uuidPro },
        { deUuid: uuidPro, aUuid: uuidPatient },
      ],
      order: { dateEnvoi: 'ASC' },
    });
  }

  async createMessage(
    deUuid: string,
    aUuid: string,
    contenuTexte: string,
  ): Promise<Message> {
    const contenuBuffer = Buffer.from(contenuTexte, 'utf-8');

    const messageEntity = this.repo.create({
      deUuid,
      aUuid,
      contenu: contenuBuffer,
    });

    return this.repo.save(messageEntity);
  }


  async findAll(): Promise<Message[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Message> {
    const msg = await this.repo.findOneBy({ id });
    if (!msg) {
      throw new NotFoundException(`Message ${id} introuvable`);
    }
    return msg;
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
