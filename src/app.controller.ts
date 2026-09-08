import { Controller, Get, Param, Post } from '@nestjs/common';

import { AppService } from './app.service';

// Controller principal da aplicação
@Controller('app')
export class AppController {

  constructor(private readonly app: AppService) {}

  // Recebe dois valores pela URL e realiza a soma
  @Get(':x/:y')
  somar(@Param('x') x, @Param('y') y) {

    return this.app.somar(x, y);

  }

}