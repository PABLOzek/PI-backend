import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categoria';
import { CategoriaController } from './categoria.controller';
import { CategoriaService } from './categoria.service';
import { CategoriaRepository } from './categoria.repository';

@Module({
  // Registra a entidade Categoria no TypeORM
  imports: [
    TypeOrmModule.forFeature([Categoria]),
  ],

  // Controller responsável pelas requisições de categoria
  controllers: [CategoriaController],

  // Serviços e repository utilizados pelo módulo
  providers: [
    CategoriaService,
    CategoriaRepository,
  ],

  // Permite utilizar o repository em outros módulos
  exports: [CategoriaRepository],
})

export class CategoriaModule {}