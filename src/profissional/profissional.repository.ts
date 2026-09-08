import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profissional } from './profissional';

@Injectable()
export class ProfissionalRepository {
  // Conecta o repository do profissional ao TypeORM
  constructor(
    @InjectRepository(Profissional)
    private readonly repositorio: Repository<Profissional>,
  ) {}

  // Salva um novo profissional no banco
  async criar(profissional: Profissional): Promise<Profissional> {
    const novo = this.repositorio.create({
      nome: profissional.nome,
      email: profissional.email,
      telefone: profissional.telefone,
      cidade: profissional.cidade,
      categoriaId: profissional.categoriaId,
    });

    return this.repositorio.save(novo);
  }

  // Busca um profissional pelo ID
  async buscarPorId(id: number): Promise<Profissional | null> {
    return this.repositorio.findOneBy({ id });
  }

  // Busca um profissional pelo e-mail
  async buscarPorEmail(email: string): Promise<Profissional | null> {
    return this.repositorio.findOneBy({ email });
  }

  // Lista todos os profissionais
  async listar(): Promise<Profissional[]> {
    return this.repositorio.find();
  }

  // Atualiza os dados de um profissional
  async atualizar(
    id: number,
    profissional: Partial<Profissional>,
  ): Promise<Profissional | null> {
    await this.repositorio.update(id, {
      nome: profissional.nome,
      email: profissional.email,
      telefone: profissional.telefone,
      cidade: profissional.cidade,
      categoriaId: profissional.categoriaId,
    });

    return this.buscarPorId(id);
  }

  // Remove um profissional pelo ID
  async remover(id: number): Promise<void> {
    await this.repositorio.delete(id);
  }
}