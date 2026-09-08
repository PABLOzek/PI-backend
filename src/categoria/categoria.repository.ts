import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Categoria } from './categoria';

@Injectable()
export class CategoriaRepository {
  // Conecta o repository da Categoria ao TypeORM
  constructor(
    @InjectRepository(Categoria)
    private readonly repository: Repository<Categoria>,
  ) {}

  // Salva uma nova categoria no banco
  async criar(dados: Categoria): Promise<Categoria> {
    const categoria = this.repository.create(dados);
    return this.repository.save(categoria);
  }

  // Busca uma categoria pelo ID
  async buscarPorId(id: number): Promise<Categoria | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  // Lista todas as categorias
  async listar(): Promise<Categoria[]> {
    return this.repository.find();
  }

  // Atualiza uma categoria e retorna os dados atualizados
  async atualizar(
    id: number,
    dados: Partial<Categoria>,
  ): Promise<Categoria | null> {
    await this.repository.update(id, dados);

    return this.buscarPorId(id);
  }

  // Remove uma categoria pelo ID
  async remover(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  // Busca uma categoria pelo nome
  async buscarPorNome(nome: string): Promise<Categoria | null> {
    return this.repository.findOne({
      where: { nome },
    });
  }

  // Busca uma categoria pela sigla
  async buscarPorSigla(sigla: string): Promise<Categoria | null> {
    return this.repository.findOne({
      where: { sigla },
    });
  }
}