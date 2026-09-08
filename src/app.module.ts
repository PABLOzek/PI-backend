import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ProfissionalModule } from './profissional/profissional.module';
import { CategoriaModule } from './categoria/categoria.module';
import { ServicoModule } from './servico/servico.module';

@Module({

  // Registra os módulos utilizados pela aplicação
  imports: [
    DatabaseModule,
    UsuarioModule,
    ProfissionalModule,
    CategoriaModule,
    ServicoModule,
  ],

  // Controller principal da aplicação
  controllers: [AppController],

  // Services utilizados pela aplicação
  providers: [AppService],

})

export class AppModule {}