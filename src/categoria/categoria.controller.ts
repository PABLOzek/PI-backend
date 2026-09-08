import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { Categoria } from './categoria';
import { CategoriaService } from './categoria.service';

// Controller responsável pelas categorias
@Controller('categorias')
export class CategoriaController {
  constructor(
    private readonly categoriaService: CategoriaService,
  ) {}

  // Cadastra uma nova categoria
  @Post()
  criar(@Body() dados: Categoria) {
    return this.categoriaService.criar(dados);
  }

  // Lista todas as categorias
  @Get()
  listar() {
    return this.categoriaService.listar();
  }

  // Busca uma categoria pelo ID
  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.categoriaService.buscarPorId(Number(id));
  }

  // Atualiza os dados de uma categoria
  @Put(':id')
  atualizar(
    @Param('id') id: string,
    @Body() dados: Partial<Categoria>,
  ) {
    return this.categoriaService.atualizar(Number(id), dados);
  }

  // Remove uma categoria
  @Delete(':id')
  remover(@Param('id') id: string) {
    return this.categoriaService.remover(Number(id));
  }
}