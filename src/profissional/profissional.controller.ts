import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { Profissional } from './profissional';
import { ProfissionalService } from './profissional.service';

// Controller responsável pelos profissionais
@Controller('profissionais')
export class ProfissionalController {
  constructor(
    private readonly profissionalService: ProfissionalService,
  ) {}

  // Cadastra um novo profissional
  @Post()
  criar(@Body() dados: Profissional) {
    return this.profissionalService.criar(dados);
  }

  // Lista todos os profissionais
  @Get()
  listar() {
    return this.profissionalService.listar();
  }

  // Busca um profissional pelo ID
  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.profissionalService.buscarPorId(Number(id));
  }

  // Atualiza os dados de um profissional
  @Put(':id')
  async atualizar(
    @Param('id') id: string,
    @Body() dados: Profissional,
  ) {
    await this.profissionalService.atualizar(
      Number(id),
      dados,
    );

    return this.profissionalService.buscarPorId(Number(id));
  }

  // Remove um profissional pelo ID
  @Delete(':id')
  async remover(@Param('id') id: string) {
    await this.profissionalService.remover(Number(id));

    return {
      mensagem: 'Profissional removido.',
    };
  }
}