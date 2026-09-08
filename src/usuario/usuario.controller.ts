import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { Usuario } from './usuario';

import { UsuarioService } from './usuario.service';

// Controller responsável pelos usuários
@Controller('usuarios')
export class UsuarioController {

  constructor(private readonly usuarioService: UsuarioService) {}

  // Cadastra um novo usuário
  @Post()
  criar(@Body() dados: Usuario) {
    return this.usuarioService.criar(dados);
  }

  // Lista todos os usuários
  @Get()
  listar() {
    return this.usuarioService.listar();
  }

  // Busca um usuário pelo ID
  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.usuarioService.buscarPorId(Number(id));
  }

  // Atualiza os dados de um usuário
  @Put(':id')
  async atualizar(@Param('id') id: string, @Body() dados: Usuario) {
    await this.usuarioService.atualizar(Number(id), dados);

    return this.usuarioService.buscarPorId(Number(id));
  }

  // Remove um usuário
  @Delete(':id')
  async remover(@Param('id') id: string) {
    await this.usuarioService.remover(Number(id));

    return { mensagem: 'Usuário removido.' };
  }

}