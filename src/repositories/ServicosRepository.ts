import { prisma } from '../database';

export class ServicosRepository {
  async findByIds(ids: string[]) {
    return prisma.servicos.findMany({
      where: {
        id: { in: ids },
        ativo: true,
      },
    });
  }
}
