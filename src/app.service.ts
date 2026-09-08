import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  // Realiza a soma dos dois valores
  somar(x: number, y: number): number {
    return this.convert(x) + this.convert(y);
  }

  // Converte o valor para número
  convert(x) {
    return Number(x);
  }

}