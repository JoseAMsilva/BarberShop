import { Request, Response } from 'express';
import { z } from 'zod';
import { AuthenticateClienteService } from '../services/AuthenticateClienteService';

export class SessionsController {
  async create(request: Request, response: Response) {
    const sessionSchema = z.object({
      email: z.string().email(),
      senha: z.string(),
    });

    const { email, senha } = sessionSchema.parse(request.body);

    const authenticateCliente = new AuthenticateClienteService();

    const { cliente, token } = await authenticateCliente.execute({
      email,
      senha_plana: senha,
    });

    response.json({ cliente, token });
  }
}
