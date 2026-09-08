import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profissional } from './profissional';
import { ProfissionalController } from './profissional.controller';
import { ProfissionalService } from './profissional.service';
import { ProfissionalRepository } from './profissional.repository';
import { CategoriaModule } from '../categoria/categoria.module';

@Module({
  // Registra as entidades e módulos utilizados
  imports: [
    TypeOrmModule.forFeature([Profissional]),
    CategoriaModule,
  ],

  // Controller responsável pelas requisições de profissionais
  controllers: [ProfissionalController],

  // Serviços e repository utilizados pelo módulo
  providers: [
    ProfissionalService,
    ProfissionalRepository,
  ],

  // Permite utilizar o repository em outros módulos
  exports: [ProfissionalRepository],
})

export class ProfissionalModule {}