import { compare } from 'bcryptjs';
import { SignJWT } from 'jose';
import { ClientesRepository } from '../repositories/ClientesRepository';
import { AppError } from '../errors/AppError';
import { env } from '../config/env';

interface IRequest {
  email: string;
  senha_plana: string;
}

export class AuthenticateClienteService {
  private clientesRepository: ClientesRepository;

  constructor() {
    this.clientesRepository = new ClientesRepository();
  }

  async execute({ email, senha_plana }: IRequest) {
    const cliente = await this.clientesRepository.findByEmail(email);

    if (!cliente || !cliente.senha) {
      throw new AppError('E-mail ou senha incorretos.', 401);
    }

    const passwordMatch = await compare(senha_plana, cliente.senha);

    if (!passwordMatch) {
      throw new AppError('E-mail ou senha incorretos.', 401);
    }

    // Geração do token JWT usando JOSE
    const secret = new TextEncoder().encode(env.JWT_SECRET);
    
    const token = await new SignJWT({ email: cliente.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject(cliente.id)
      .setExpirationTime(env.JWT_EXPIRES_IN)
      .sign(secret);

    const { senha: _, ...clienteWithoutPassword } = cliente;

    return {
      cliente: clienteWithoutPassword,
      token,
    };
  }
}
