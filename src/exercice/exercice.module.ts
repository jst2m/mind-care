import { Module }             from '@nestjs/common';
import { TypeOrmModule }      from '@nestjs/typeorm';
import { Exercice }           from './exercice.entity';
import { ExerciceService }    from './exercice.service';
import { ExerciceController } from './exercice.controller';
import { AuthModule }         from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Exercice]),
    AuthModule,
  ],
  providers: [ExerciceService],
  controllers: [ExerciceController],
})
export class ExerciceModule {}
