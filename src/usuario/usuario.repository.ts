import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario';

@Injectable()
export class UsuarioRepository {

  // Conecta o repository do usuário ao TypeORM
  constructor(
    @InjectRepository(Usuario)
    private readonly repositorio: Repository<Usuario>,
  ) {}

  // Salva um novo usuário no banco
  async criar(usuario: Usuario): Promise<Usuario> {
    const novo = this.repositorio.create({
      nome: usuario.nome,
      email: usuario.email,
      cpf: usuario.cpf,
      telefone: usuario.telefone ?? null,
      data_nascimento: usuario.data_nascimento ?? null,
    });

    return this.repositorio.save(novo);
  }

  // Busca um usuário pelo ID
  async buscarPorId(id: number): Promise<Usuario | null> {
    return this.repositorio.findOneBy({ id });
  }

  // Lista todos os usuários
  async listar(): Promise<Usuario[]> {
    return this.repositorio.find();
  }

  // Atualiza os dados de um usuário
  async atualizar(id: number, usuario: Usuario): Promise<void> {
    await this.repositorio.update(id, {
      nome: usuario.nome,
      email: usuario.email,
      cpf: usuario.cpf,
      telefone: usuario.telefone ?? null,
      data_nascimento: usuario.data_nascimento ?? null,
    });
  }

  // Remove um usuário pelo ID
  async remover(id: number): Promise<void> {
    await this.repositorio.delete(id);
  }
}