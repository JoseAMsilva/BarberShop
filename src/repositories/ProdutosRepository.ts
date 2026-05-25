import { prisma } from '../database';
import { Prisma } from '@prisma/client';

export class ProdutosRepository {
  async create(data: Prisma.produtosCreateInput) {
    return prisma.produtos.create({ data });
  }

  async findById(id: string) {
    return prisma.produtos.findUnique({
      where: { id },
    });
  }

  async findAll() {
    return prisma.produtos.findMany({
      where: { ativo: true },
      orderBy: { nome: 'asc' },
    });
  }

  async getEstoqueBaixo() {
    return prisma.$queryRaw`SELECT * FROM produtos WHERE quantidade_estoque <= estoque_minimo AND ativo = 1`;
  }
}
