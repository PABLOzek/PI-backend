import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { Usuario } from '../usuario/usuario';
import { Profissional } from '../profissional/profissional';
import { Categoria } from '../categoria/categoria';
import { Servico } from '../servico/servico';

// Define o caminho onde o banco será armazenado
const pastaBanco = join(process.cwd(), 'database');

// Cria a pasta do banco caso ela não exista
if (!existsSync(pastaBanco)) {
  mkdirSync(pastaBanco, { recursive: true });
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // Configuração do banco SQLite
      type: 'better-sqlite3',

      // Define o arquivo do banco de dados
      database: join(pastaBanco, 'resolve-ai.sqlite'),

      // Entidades utilizadas pelo banco
      entities: [Usuario, Profissional, Categoria, Servico],

      // Cria e atualiza as tabelas automaticamente
      synchronize: true,
    }),
  ],
})

// Módulo responsável pela configuração do banco de dados
export class DatabaseModule {}
