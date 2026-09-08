import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario';
import { UsuarioController } from './usuario.controller';
import { UsuarioRepository } from './usuario.repository';
import { UsuarioService } from './usuario.service';

@Module({

  // Registra a entidade utilizada pelo módulo
  imports: [TypeOrmModule.forFeature([Usuario])],

  // Controller responsável pelos usuários
  controllers: [UsuarioController],

  // Service e repository utilizados pelo módulo
  providers: [UsuarioService, UsuarioRepository],

})

export class UsuarioModule {}