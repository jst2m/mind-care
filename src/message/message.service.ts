import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository }      from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Message }         from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private repo: Repository<Message>
  ) {}

  findAll(): Promise<Message[]> {
    return this.repo.find();
  }

  findOne(id: number): Promise<Message> {
    return this.repo.findOneBy({ id })
      .then(m => m ?? Promise.reject(new NotFoundException()));
  }

  create(msg: Partial<Message>) {
    return this.repo.save(msg);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
