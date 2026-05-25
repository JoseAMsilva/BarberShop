import { hash } from 'bcryptjs';
import { Prisma } from '@prisma/client';
import { ClientesRepository } from '../repositories/ClientesRepository';
import { AppError } from '../errors/AppError';

export class CreateClienteService {
  private clientesRepository: ClientesRepository;

  constructor() {
    this.clientesRepository = new ClientesRepository();
  }

  async execute(data: Prisma.clientesCreateInput) {
    // Valida e-mail duplicado
    if (data.email) {
      const emailExists = await this.clientesRepository.findByEmail(data.email);
      if (emailExists) {
        throw new AppError('E-mail já está em uso.');
      }
    }

    // Valida telefone duplicado
    const telefoneExists = await this.clientesRepository.findByTelefone(data.telefone);
    if (telefoneExists) {
      throw new AppError('Telefone já está em uso.');
    }

    // Criptografa a senha, se fornecida
    if (data.senha) {
      data.senha = await hash(data.senha, 8);
    }

    // Cria o cliente
    const cliente = await this.clientesRepository.create(data);

    // Remove a senha do retorno por segurança
    const { senha: _, ...clienteWithoutPassword } = cliente;

    return clienteWithoutPassword;
  }
}
