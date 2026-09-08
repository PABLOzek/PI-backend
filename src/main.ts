import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Inicia a aplicação
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Define a porta do servidor
  const porta = process.env.PORT ?? 3000;

  // Permite requisições de outras origens
  app.enableCors();

  // Inicia o servidor
  await app.listen(porta);

  console.log('Aplicação iniciada.');
  console.log(`Servidor rodando em http://localhost:${porta}`);
}

void bootstrap();