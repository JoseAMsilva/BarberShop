import { prisma } from '../database';
import { Prisma } from '@prisma/client';

export class ClientesRepository {
  async create(data: Prisma.clientesCreateInput) {
    const cliente = await prisma.clientes.create({
      data,
    });
    return cliente;
  }

  async findByEmail(email: string) {
    const cliente = await prisma.clientes.findUnique({
      where: { email },
    });
    return cliente;
  }

  async findByTelefone(telefone: string) {
    const cliente = await prisma.clientes.findUnique({
      where: { telefone },
    });
    return cliente;
  }

  async findById(id: string) {
    const cliente = await prisma.clientes.findUnique({
      where: { id },
    });
    return cliente;
  }
}
