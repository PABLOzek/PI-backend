import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Servico } from './servico';
import { ServicoRepository } from './servico.repository';
import { CategoriaRepository } from '../categoria/categoria.repository';
import { ProfissionalRepository } from '../profissional/profissional.repository';

@Injectable()
export class ServicoService {
  constructor(
    private readonly servicoRepository: ServicoRepository,
    private readonly categoriaRepository: CategoriaRepository,
    private readonly profissionalRepository: ProfissionalRepository,
  ) {}

  // Cadastra um novo serviço
  async criar(dados: Servico): Promise<Servico> {

    // Verifica se o nome foi informado
    if (!dados.nome || dados.nome.trim() === '') {
      throw new BadRequestException(
        'O nome do serviço é obrigatório.',
      );
    }

    // Verifica se a descrição foi informada
    if (!dados.descricao || dados.descricao.trim() === '') {
      throw new BadRequestException(
        'A descrição do serviço é obrigatória.',
      );
    }

    // Verifica se a categoria foi informada
    if (!dados.categoriaId) {
      throw new BadRequestException(
        'A categoria do serviço é obrigatória.',
      );
    }

    // Verifica se o profissional foi informado
    if (!dados.profissionalId) {
      throw new BadRequestException(
        'O profissional do serviço é obrigatório.',
      );
    }

    // Verifica se a categoria existe
    const categoria = await this.categoriaRepository.buscarPorId(
      dados.categoriaId,
    );

    if (!categoria) {
      throw new BadRequestException(
        'A categoria informada não existe.',
      );
    }

    // Verifica se o profissional existe
    const profissional =
      await this.profissionalRepository.buscarPorId(
        dados.profissionalId,
      );

    if (!profissional) {
      throw new BadRequestException(
        'O profissional informado não existe.',
      );
    }

    // Remove espaços desnecessários dos dados
    return this.servicoRepository.criar({
      ...dados,
      nome: dados.nome.trim(),
      descricao: dados.descricao.trim(),
    });
  }

  // Lista todos os serviços
  async listar(): Promise<Servico[]> {
    return this.servicoRepository.listar();
  }

  // Busca um serviço pelo ID
  async buscarPorId(id: number): Promise<Servico> {
    const servico =
      await this.servicoRepository.buscarPorId(id);

    if (!servico) {
      throw new NotFoundException(
        'Serviço não encontrado.',
      );
    }

    return servico;
  }

  // Lista os serviços de um profissional
  async listarPorProfissional(
    profissionalId: number,
  ): Promise<Servico[]> {

    // Verifica se o profissional existe
    const profissional =
      await this.profissionalRepository.buscarPorId(
        profissionalId,
      );

    if (!profissional) {
      throw new NotFoundException(
        'Profissional não encontrado.',
      );
    }

    return this.servicoRepository.listarPorProfissional(
      profissionalId,
    );
  }

  // Lista os serviços de uma categoria
  async listarPorCategoria(
    categoriaId: number,
  ): Promise<Servico[]> {

    // Verifica se a categoria existe
    const categoria =
      await this.categoriaRepository.buscarPorId(
        categoriaId,
      );

    if (!categoria) {
      throw new NotFoundException(
        'Categoria não encontrada.',
      );
    }

    return this.servicoRepository.listarPorCategoria(
      categoriaId,
    );
  }

  // Atualiza os dados de um serviço
  async atualizar(
    id: number,
    dados: Partial<Servico>,
  ): Promise<Servico> {

    // Verifica se o serviço existe
    await this.buscarPorId(id);

    // Valida o nome caso ele seja informado
    if (dados.nome !== undefined) {
      if (dados.nome.trim() === '') {
        throw new BadRequestException(
          'O nome do serviço é obrigatório.',
        );
      }

      dados.nome = dados.nome.trim();
    }

    // Valida a descrição caso ela seja informada
    if (dados.descricao !== undefined) {
      if (dados.descricao.trim() === '') {
        throw new BadRequestException(
          'A descrição do serviço é obrigatória.',
        );
      }

      dados.descricao = dados.descricao.trim();
    }

    // Verifica se a nova categoria existe
    if (dados.categoriaId !== undefined) {
      const categoria =
        await this.categoriaRepository.buscarPorId(
          dados.categoriaId,
        );

      if (!categoria) {
        throw new BadRequestException(
          'A categoria informada não existe.',
        );
      }
    }

    // Verifica se o novo profissional existe
    if (dados.profissionalId !== undefined) {
      const profissional =
        await this.profissionalRepository.buscarPorId(
          dados.profissionalId,
        );

      if (!profissional) {
        throw new BadRequestException(
          'O profissional informado não existe.',
        );
      }
    }

    // Atualiza o serviço no banco
    const servicoAtualizado =
      await this.servicoRepository.atualizar(id, dados);

    if (!servicoAtualizado) {
      throw new NotFoundException(
        'Serviço não encontrado.',
      );
    }

    return servicoAtualizado;
  }

  // Remove um serviço pelo ID
  async remover(id: number): Promise<void> {

    // Verifica se o serviço existe
    await this.buscarPorId(id);

    await this.servicoRepository.remover(id);
  }
}