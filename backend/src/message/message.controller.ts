// src/message/message.controller.ts

import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Request,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MessageService } from './message.service';
import { Message } from './message.entity';

@Controller('messages') 
@UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(private readonly svc: MessageService) {}

  @Get()
  async findAll(@Request() req): Promise<Message[]> {
    return this.svc.findAll();
  }


  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Message> {
    return this.svc.findOne(id);
  }


  @Post()
  async create(
    @Request() req,
    @Body() body: { toUuid: string; contenu: string },
  ): Promise<Message> {
    const fromUuid = req.user.uuid;
    const { toUuid, contenu } = body;
    return this.svc.createMessage(fromUuid, toUuid, contenu);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.svc.remove(id);
  }

  @Get('conversation/:proUuid')
  async getConversation(
    @Request() req,
    @Param('proUuid') proUuid: string,
  ): Promise<Message[]> {
    const uuidPatient = req.user.uuid;
    return this.svc.getConversation(uuidPatient, proUuid);
  }
}
