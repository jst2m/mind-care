import {
  Controller, Get, Post, Delete,
  Param, Body, UseGuards
} from '@nestjs/common';
import { JwtAuthGuard }       from '../auth/jwt-auth.guard';
import { MessageService }     from './message.service';

@Controller('message')
@UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(private svc: MessageService) {}

  @Get() findAll() { return this.svc.findAll(); }

  @Get(':id') findOne(@Param('id') id: number) {
    return this.svc.findOne(id);
  }

  @Post() create(@Body() body) { return this.svc.create(body); }

  @Delete(':id') remove(@Param('id') id: number) {
    return this.svc.remove(id);
  }
}
