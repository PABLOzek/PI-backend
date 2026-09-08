import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Usuario } from './usuario';
import { UsuarioRepository } from './usuario.repository';

@Injectable()
export class UsuarioService {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  // Verifica se o texto está vazio
  private textoVazio(valor?: string | null): boolean {
    return !valor || !valor.trim();
  }

  // Valida os dados do usuário
  private async validar(dados: Usuario, idAtual?: number): Promise<void> {

    // Verifica se o nome foi informado
    if (this.textoVazio(dados.nome)) {
      throw new BadRequestException('O nome do usuário é obrigatório.');
    }

    // Verifica se o e-mail foi informado
    if (this.textoVazio(dados.email)) {
      throw new BadRequestException('O e-mail do usuário é obrigatório.');
    }

    // Verifica se o CPF foi informado
    if (this.textoVazio(dados.cpf)) {
      throw new BadRequestException('O CPF do usuário é obrigatório.');
    }

    const lista = await this.usuarioRepository.listar();
    const email = dados.email.trim();
    const cpf = dados.cpf.trim();

    // Verifica se o e-mail já está cadastrado
    if (lista.some((item) => item.email === email && item.id !== idAtual)) {
      throw new BadRequestException('Já existe um usuário com este e-mail.');
    }

    // Verifica se o CPF já está cadastrado
    if (lista.some((item) => item.cpf === cpf && item.id !== idAtual)) {
      throw new BadRequestException('Já existe um usuário com este CPF.');
    }
  }

  // Remove espaços e ajusta os dados opcionais
  private normalizar(dados: Usuario): Usuario {
    return {
      nome: dados.nome.trim(),
      email: dados.email.trim(),
      cpf: dados.cpf.trim(),
      telefone: dados.telefone?.trim() || null,
      data_nascimento: dados.data_nascimento?.trim() || null,
    };
  }

  // Cadastra um novo usuário
  async criar(dados: Usuario): Promise<Usuario> {
    await this.validar(dados);

    return this.usuarioRepository.criar(this.normalizar(dados));
  }

  // Busca um usuário pelo ID
  async buscarPorId(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.buscarPorId(id);

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return usuario;
  }

  // Lista todos os usuários
  async listar(): Promise<Usuario[]> {
    return this.usuarioRepository.listar();
  }

  // Atualiza os dados de um usuário
  async atualizar(id: number, dados: Usuario): Promise<void> {
    // Verifica se o usuário existe
    await this.buscarPorId(id);

    // Valida os dados antes de atualizar
    await this.validar(dados, id);

    // Atualiza o usuário no banco
    await this.usuarioRepository.atualizar(id, this.normalizar(dados));
  }

  // Remove um usuário pelo ID
  async remover(id: number): Promise<void> {
    // Verifica se o usuário existe
    await this.buscarPorId(id);

    await this.usuarioRepository.remover(id);
  }
}