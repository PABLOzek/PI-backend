import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Define a tabela de serviços no banco
@Entity('servicos')
export class Servico {

  // ID gerado automaticamente pelo banco
  @PrimaryGeneratedColumn()
  id!: number;

  // Nome do serviço
  @Column()
  nome!: string;

  // Descrição do serviço
  @Column({ type: 'text' })
  descricao!: string;

  // ID da categoria do serviço
  @Column()
  categoriaId!: number;

  // ID do profissional responsável pelo serviço
  @Column()
  profissionalId!: number;
}