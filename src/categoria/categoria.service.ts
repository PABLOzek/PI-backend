import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Categoria } from './categoria';
import { CategoriaRepository } from './categoria.repository';

@Injectable()
export class CategoriaService {
  constructor(
    private readonly categoriaRepository: CategoriaRepository,
  ) {}

  // Cadastra uma nova categoria
  async criar(dados: Categoria): Promise<Categoria> {

    // Verifica se o nome foi informado
    if (!dados.nome || dados.nome.trim() === '') {
      throw new BadRequestException('O nome da categoria é obrigatório.');
    }

    // Verifica se a sigla foi informada
    if (!dados.sigla || dados.sigla.trim() === '') {
      throw new BadRequestException('A sigla da categoria é obrigatória.');
    }

    // Remove espaços e padroniza a sigla em letras maiúsculas
    const nome = dados.nome.trim();
    const sigla = dados.sigla.trim().toUpperCase();

    // Verifica se já existe uma categoria com o mesmo nome
    const categoriaComMesmoNome =
      await this.categoriaRepository.buscarPorNome(nome);

    if (categoriaComMesmoNome) {
      throw new BadRequestException(
        'Já existe uma categoria com esse nome.',
      );
    }

    // Verifica se já existe uma categoria com a mesma sigla
    const categoriaComMesmaSigla =
      await this.categoriaRepository.buscarPorSigla(sigla);

    if (categoriaComMesmaSigla) {
      throw new BadRequestException(
        'Já existe uma categoria com essa sigla.',
      );
    }

    // Salva a categoria após todas as validações
    return this.categoriaRepository.criar({
      ...dados,
      nome,
      sigla,
      descricao: dados.descricao?.trim() || null,
    });
  }

  // Lista todas as categorias
  async listar(): Promise<Categoria[]> {
    return this.categoriaRepository.listar();
  }

  // Busca uma categoria pelo ID
  async buscarPorId(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.buscarPorId(id);

    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada.');
    }

    return categoria;
  }

  // Atualiza os dados de uma categoria
  async atualizar(
    id: number,
    dados: Partial<Categoria>,
  ): Promise<Categoria> {
    // Verifica se a categoria existe
    await this.buscarPorId(id);

    // Valida o nome caso ele seja informado
    if (dados.nome !== undefined) {
      if (dados.nome.trim() === '') {
        throw new BadRequestException(
          'O nome da categoria é obrigatório.',
        );
      }

      const nome = dados.nome.trim();

      // Verifica se o novo nome já está sendo usado por outra categoria
      const categoriaComMesmoNome =
        await this.categoriaRepository.buscarPorNome(nome);

      if (
        categoriaComMesmoNome &&
        categoriaComMesmoNome.id !== id
      ) {
        throw new BadRequestException(
          'Já existe uma categoria com esse nome.',
        );
      }

      dados.nome = nome;
    }

    // Valida a sigla caso ela seja informada
    if (dados.sigla !== undefined) {
      if (dados.sigla.trim() === '') {
        throw new BadRequestException(
          'A sigla da categoria é obrigatória.',
        );
      }

      const sigla = dados.sigla.trim().toUpperCase();

      // Verifica se a nova sigla já está sendo usada por outra categoria
      const categoriaComMesmaSigla =
        await this.categoriaRepository.buscarPorSigla(sigla);

      if (
        categoriaComMesmaSigla &&
        categoriaComMesmaSigla.id !== id
      ) {
        throw new BadRequestException(
          'Já existe uma categoria com essa sigla.',
        );
      }

      dados.sigla = sigla;
    }

    // Descrição é opcional
    if (dados.descricao !== undefined) {
      dados.descricao = dados.descricao?.trim() || null;
    }

    // Atualiza os dados no banco
    const categoriaAtualizada =
      await this.categoriaRepository.atualizar(id, dados);

    if (!categoriaAtualizada) {
      throw new NotFoundException('Categoria não encontrada.');
    }

    return categoriaAtualizada;
  }

  // Remove uma categoria pelo ID
  async remover(id: number): Promise<void> {
    await this.buscarPorId(id);

    await this.categoriaRepository.remover(id);
  }
}