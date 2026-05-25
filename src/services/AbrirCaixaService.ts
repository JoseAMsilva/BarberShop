import { CaixaRepository } from '../repositories/CaixaRepository';
import { AppError } from '../errors/AppError';

export class AbrirCaixaService {
  async execute(valorAbertura: number) {
    const caixaRepository = new CaixaRepository();

    const caixaAberto = await caixaRepository.getCaixaAberto();
    if (caixaAberto) {
      throw new AppError('Já existe um caixa aberto. Feche-o primeiro.', 400);
    }

    const caixa = await caixaRepository.abrirCaixa(valorAbertura);
    return caixa;
  }
}
