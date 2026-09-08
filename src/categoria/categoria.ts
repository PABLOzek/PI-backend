import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Define a tabela de categorias no banco
@Entity('categorias')
export class Categoria {

  // ID gerado automaticamente pelo banco
  @PrimaryGeneratedColumn()
  id!: number;

  // Nome da categoria, sem valores repetidos
  @Column({ unique: true })
  nome!: string;

  // Sigla da categoria, sem valores repetidos
  @Column({ unique: true })
  sigla!: string;

  // Descrição opcional da categoria
  @Column({ type: 'text', nullable: true })
  descricao!: string | null;
}