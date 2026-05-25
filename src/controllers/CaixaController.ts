import { Request, Response } from 'express';
import { z } from 'zod';
import { AbrirCaixaService } from '../services/AbrirCaixaService';
import { CaixaRepository } from '../repositories/CaixaRepository';

export class CaixaController {
  async abrir(request: Request, response: Response) {
    const abrirCaixaSchema = z.object({
      valor_abertura: z.number().min(0).default(0),
    });

    const { valor_abertura } = abrirCaixaSchema.parse(request.body);

    const abrirCaixaService = new AbrirCaixaService();
    const caixa = await abrirCaixaService.execute(valor_abertura);

    response.status(201).json(caixa);
  }

  async fechar(request: Request, response: Response) {
    const fecharCaixaSchema = z.object({
      valor_fechamento: z.number().min(0),
    });

    const { valor_fechamento } = fecharCaixaSchema.parse(request.body);
    const { id } = request.params;

    const caixaRepository = new CaixaRepository();
    const caixaFechado = await caixaRepository.fecharCaixa(id, valor_fechamento);

    response.json(caixaFechado);
  }

  async status(request: Request, response: Response) {
    const caixaRepository = new CaixaRepository();
    const caixaAberto = await caixaRepository.getCaixaAberto();
    
    response.json({ caixaAberto: caixaAberto || null });
  }
}
