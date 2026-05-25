import { Request, Response } from 'express';
import { z } from 'zod';
import { CreateAgendamentoService } from '../services/CreateAgendamentoService';

export class AgendamentosController {
  async create(request: Request, response: Response) {
    // Validação dos dados de entrada
    const createAgendamentoSchema = z.object({
      barbeiro_id: z.string().uuid(),
      servicos_ids: z.array(z.string().uuid()).min(1),
      data_hora_inicio: z.coerce.date(), // Converte string ISO 8601 para Date
      observacoes: z.string().optional(),
    });

    const data = createAgendamentoSchema.parse(request.body);
    const cliente_id = request.user!.id; // Pego do token JWT

    const createAgendamentoService = new CreateAgendamentoService();

    const agendamento = await createAgendamentoService.execute({
      cliente_id,
      ...data,
    });

    response.status(201).json(agendamento);
  }
}
