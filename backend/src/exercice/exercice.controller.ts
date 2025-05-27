import {
  Controller, Get, Post, Put, Delete,
  Param, Body, UseGuards
} from '@nestjs/common';
import { JwtAuthGuard }     from '../auth/jwt-auth.guard';
import { ExerciceService }  from './exercice.service';

@Controller('exercice')
@UseGuards(JwtAuthGuard)
export class ExerciceController {
  constructor(private svc: ExerciceService) {}

  @Get() findAll() { return this.svc.findAll(); }

  @Get(':id') findOne(@Param('id') id: number) {
    return this.svc.findOne(id);
  }

  @Post() create(@Body() body) { return this.svc.create(body); }

  @Put(':id') update(@Param('id') id: number, @Body() body) {
    return this.svc.update(id, body);
  }

  @Delete(':id') remove(@Param('id') id: number) {
    return this.svc.remove(id);
  }
}
