import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servico } from './servico';
import { ServicoRepository } from './servico.repository';
import { ServicoService } from './servico.service';
import { ServicoController } from './servico.controller';
import { CategoriaModule } from '../categoria/categoria.module';
import { ProfissionalModule } from '../profissional/profissional.module';

@Module({

  // Registra os módulos e entidade utilizados
  imports: [
    TypeOrmModule.forFeature([Servico]),
    CategoriaModule,
    ProfissionalModule,
  ],

  // Controller responsável pelas requisições de serviços
  controllers: [ServicoController],

  // Repository e service utilizados pelo módulo
  providers: [ServicoRepository, ServicoService],

})

export class ServicoModule {}