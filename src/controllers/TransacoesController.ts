import { Request, Response } from 'express';
import { z } from 'zod';
import { RegistrarPagamentoService } from '../services/RegistrarPagamentoService';
import { TransacoesRepository } from '../repositories/TransacoesRepository';

export class TransacoesController {
  async registrarPagamento(request: Request, response: Response) {
    const pagamentoSchema = z.object({
      agendamento_id: z.string().uuid(),
      forma_pagamento: z.enum(['dinheiro', 'pix', 'credito', 'debito']),
    });

    const data = pagamentoSchema.parse(request.body);

    const registrarPagamentoService = new RegistrarPagamentoService();
    const transacao = await registrarPagamentoService.execute(data);

    response.status(201).json(transacao);
  }

  async listarPorCaixa(request: Request, response: Response) {
    const { caixa_id } = request.params;
    
    const transacoesRepository = new TransacoesRepository();
    const transacoes = await transacoesRepository.findByCaixa(caixa_id);
    
    response.json(transacoes);
  }
}
