import { prisma } from '../database';

export class CaixaRepository {
  async getCaixaAberto() {
    return prisma.caixa.findFirst({
      where: { status: 'aberto' },
      orderBy: { data_abertura: 'desc' },
    });
  }

  async abrirCaixa(valorAbertura: number) {
    return prisma.caixa.create({
      data: {
        valor_abertura: valorAbertura,
        status: 'aberto',
      },
    });
  }

  async fecharCaixa(caixaId: string, valorFechamento: number) {
    return prisma.caixa.update({
      where: { id: caixaId },
      data: {
        valor_fechamento: valorFechamento,
        data_fechamento: new Date(),
        status: 'fechado',
        atualizado_em: new Date(),
      },
    });
  }
}
