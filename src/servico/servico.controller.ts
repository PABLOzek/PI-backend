import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { Servico } from './servico';
import { ServicoService } from './servico.service';

// Controller responsável pelos serviços
@Controller('servicos')
export class ServicoController {
  constructor(
    private readonly servicoService: ServicoService,
  ) {}

  // Cadastra um novo serviço
  @Post()
  criar(@Body() dados: Servico) {
    return this.servicoService.criar(dados);
  }

  // Lista todos os serviços
  @Get()
  listar() {
    return this.servicoService.listar();
  }

  // Lista os serviços de um profissional
  @Get('/profissional/:profissionalId')
  listarPorProfissional(
    @Param('profissionalId', ParseIntPipe)
    profissionalId: number,
  ) {
    return this.servicoService.listarPorProfissional(
      profissionalId,
    );
  }

  // Lista os serviços de uma categoria
  @Get('/categoria/:categoriaId')
  listarPorCategoria(
    @Param('categoriaId', ParseIntPipe)
    categoriaId: number,
  ) {
    return this.servicoService.listarPorCategoria(
      categoriaId,
    );
  }

  // Busca um serviço pelo ID
  @Get(':id')
  buscarPorId(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.servicoService.buscarPorId(id);
  }

  // Atualiza os dados de um serviço
  @Patch(':id')
  atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dados: Partial<Servico>,
  ) {
    return this.servicoService.atualizar(id, dados);
  }

  // Remove um serviço
  @Delete(':id')
  remover(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.servicoService.remover(id);
  }
}