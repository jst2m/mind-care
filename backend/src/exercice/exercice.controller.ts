// backend/src/exercice/exercice.controller.ts
import {
  Controller, Get, Post, Put, Delete,
  Param, Body, UseGuards
} from '@nestjs/common';
import { JwtAuthGuard }    from '../auth/jwt-auth.guard';
import { ExerciceService } from './exercice.service';
import { Exercice }        from './exercice.entity';

interface ExoDto {
  id: number;
  title: string;
  content_markdown: string;
}

@Controller('exercice')
@UseGuards(JwtAuthGuard)
export class ExerciceController {
  constructor(private svc: ExerciceService) {}

  @Get()
  async findAll(): Promise<ExoDto[]> {
    const list = await this.svc.findAll();
    return list.map(e => ({
      id: e.id,
      title: e.titre,
      content_markdown: e.description,    
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ExoDto> {
    const e = await this.svc.findOne(id);
    return {
      id: e.id,
      title: e.titre,
      content_markdown: e.description,
    };
  }

  @Post()
  async create(@Body() body: Partial<Exercice>): Promise<ExoDto> {
    const e = await this.svc.create(body);
    return {
      id: e.id,
      title: e.titre,
      content_markdown: e.description,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: Partial<Exercice>
  ): Promise<ExoDto> {
    await this.svc.update(id, body);
    const e = await this.svc.findOne(id);
    return {
      id: e.id,
      title: e.titre,
      content_markdown: e.description,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.svc.remove(id);
  }
}
