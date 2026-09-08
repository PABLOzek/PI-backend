import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Profissional } from './profissional';
import { ProfissionalRepository } from './profissional.repository';
import { CategoriaRepository } from '../categoria/categoria.repository';

@Injectable()
export class ProfissionalService {
  constructor(
    private readonly profissionalRepository: ProfissionalRepository,
    private readonly categoriaRepository: CategoriaRepository,
  ) {}

  // Cadastra um novo profissional
  async criar(dados: Profissional): Promise<Profissional> {

    // Verifica se o nome é obrigatório
    if (!dados.nome || dados.nome.trim() === '') {
      throw new BadRequestException(
        'O nome do profissional é obrigatório.',
      );
    }

    // Verifica se o e-mail é obrigatório
    if (!dados.email || dados.email.trim() === '') {
      throw new BadRequestException(
        'O e-mail do profissional é obrigatório.',
      );
    }

    // Verifica se o telefone é obrigatório
    if (!dados.telefone || dados.telefone.trim() === '') {
      throw new BadRequestException(
        'O telefone do profissional é obrigatório.',
      );
    }

    // Verifica se a cidade é obrigatória
    if (!dados.cidade || dados.cidade.trim() === '') {
      throw new BadRequestException(
        'A cidade do profissional é obrigatória.',
      );
    }

    // Verifica se a categoria foi informada
    if (!dados.categoriaId) {
      throw new BadRequestException(
        'A categoria do profissional é obrigatória.',
      );
    }

    // Verifica se a categoria informada existe
    const categoria = await this.categoriaRepository.buscarPorId(
      dados.categoriaId,
    );

    if (!categoria) {
      throw new BadRequestException(
        'A categoria informada não existe.',
      );
    }

    // Remove espaços desnecessários dos dados
    const nome = dados.nome.trim();
    const email = dados.email.trim();
    const telefone = dados.telefone.trim();
    const cidade = dados.cidade.trim();

    // Verifica se o e-mail já está cadastrado
    const profissionalComMesmoEmail =
      await this.profissionalRepository.buscarPorEmail(email);

    if (profissionalComMesmoEmail) {
      throw new BadRequestException(
        'Já existe um profissional com esse e-mail.',
      );
    }

    // Salva o profissional após as validações
    return this.profissionalRepository.criar({
      ...dados,
      nome,
      email,
      telefone,
      cidade,
      categoriaId: dados.categoriaId,
    });
  }

  // Lista todos os profissionais
  async listar(): Promise<Profissional[]> {
    return this.profissionalRepository.listar();
  }

  // Busca um profissional pelo ID
  async buscarPorId(id: number): Promise<Profissional> {
    const profissional =
      await this.profissionalRepository.buscarPorId(id);

    if (!profissional) {
      throw new NotFoundException(
        'Profissional não encontrado.',
      );
    }

    return profissional;
  }

  // Atualiza os dados de um profissional
  async atualizar(
    id: number,
    dados: Partial<Profissional>,
  ): Promise<Profissional> {

    // Verifica se o profissional existe
    await this.buscarPorId(id);

    // Valida o nome caso seja informado
    if (dados.nome !== undefined) {
      if (dados.nome.trim() === '') {
        throw new BadRequestException(
          'O nome do profissional é obrigatório.',
        );
      }

      dados.nome = dados.nome.trim();
    }

    // Valida o e-mail e verifica se ele já está cadastrado
    if (dados.email !== undefined) {
      if (dados.email.trim() === '') {
        throw new BadRequestException(
          'O e-mail do profissional é obrigatório.',
        );
      }

      const email = dados.email.trim();

      const profissionalComMesmoEmail =
        await this.profissionalRepository.buscarPorEmail(email);

      // Ignora o próprio profissional durante a atualização
      if (
        profissionalComMesmoEmail &&
        profissionalComMesmoEmail.id !== id
      ) {
        throw new BadRequestException(
          'Já existe um profissional com esse e-mail.',
        );
      }

      dados.email = email;
    }

    // Valida o telefone caso seja informado
    if (dados.telefone !== undefined) {
      if (dados.telefone.trim() === '') {
        throw new BadRequestException(
          'O telefone do profissional é obrigatório.',
        );
      }

      dados.telefone = dados.telefone.trim();
    }

    // Valida a cidade caso seja informada
    if (dados.cidade !== undefined) {
      if (dados.cidade.trim() === '') {
        throw new BadRequestException(
          'A cidade do profissional é obrigatória.',
        );
      }

      dados.cidade = dados.cidade.trim();
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

    // Atualiza os dados do profissional
    const profissionalAtualizado =
      await this.profissionalRepository.atualizar(id, dados);

    if (!profissionalAtualizado) {
      throw new NotFoundException(
        'Profissional não encontrado.',
      );
    }

    return profissionalAtualizado;
  }

  // Remove um profissional pelo ID
  async remover(id: number): Promise<void> {
    await this.buscarPorId(id);

    await this.profissionalRepository.remover(id);
  }
}