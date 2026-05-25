import { Request, Response } from 'express';
import { z } from 'zod';
import { CreateClienteService } from '../services/CreateClienteService';
import { ClientesRepository } from '../repositories/ClientesRepository';

export class ClientesController {
  async create(request: Request, response: Response) {
    const createClienteSchema = z.object({
      nome: z.string().min(3),
      telefone: z.string().min(10),
      email: z.string().email().optional(),
      senha: z.string().min(6).optional(),
      endereco: z.string().optional(),
      cidade: z.string().optional(),
      estado: z.string().length(2).optional(),
      cep: z.string().optional(),
    });

    const data = createClienteSchema.parse(request.body);

    const createClienteService = new CreateClienteService();
    const cliente = await createClienteService.execute(data);

    response.status(201).json(cliente);
  }

  async show(request: Request, response: Response) {
    const { id } = request.user!;

    const clientesRepository = new ClientesRepository();
    const cliente = await clientesRepository.findById(id);

    if (!cliente) {
      response.status(404).json({ error: 'Cliente não encontrado' });
      return;
    }

    const { senha: _, ...clienteWithoutPassword } = cliente;
    response.json(clienteWithoutPassword);
  }
}
