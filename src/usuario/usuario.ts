import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Define a tabela de usuários no banco
@Entity('usuarios')
export class Usuario {

  // ID gerado automaticamente pelo banco
  @PrimaryGeneratedColumn()
  id?: number;

  // Nome do usuário
  @Column({ type: 'text' })
  nome!: string;

  // E-mail único do usuário
  @Column({ type: 'text', unique: true })
  email!: string;

  // CPF único do usuário
  @Column({ type: 'text', unique: true })
  cpf!: string;

  // Telefone opcional
  @Column({ type: 'text', nullable: true })
  telefone?: string | null;

  // Data de nascimento opcional
  @Column({ type: 'text', nullable: true })
  data_nascimento?: string | null;
}