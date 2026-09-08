import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Define a tabela de profissionais no banco
@Entity('profissionais')
export class Profissional {

  // ID gerado automaticamente pelo banco
  @PrimaryGeneratedColumn()
  id!: number;

  // Nome do profissional
  @Column()
  nome!: string;

  // E-mail único do profissional
  @Column({ unique: true })
  email!: string;

  // Telefone do profissional
  @Column()
  telefone!: string;

  // Cidade onde o profissional atende
  @Column()
  cidade!: string;

  // ID da categoria do profissional
  @Column()
  categoriaId!: number;
}