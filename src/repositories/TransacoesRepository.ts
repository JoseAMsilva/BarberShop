import { prisma } from '../database';
import { transacoes_tipo, transacoes_forma_pagamento } from '@prisma/client';

export class TransacoesRepository {
  // O pagamento engloba criar a transação e as comissões na mesma transação atômica do banco de dados
  async registrarPagamentoComComissao({
    caixa_id,
    agendamento_id,
    valor,
    forma_pagamento,
    comissoes,
  }: {
    caixa_id: string;
    agendamento_id: string;
    valor: number;
    forma_pagamento: transacoes_forma_pagamento;
    comissoes: Array<{
      barbeiro_id: string;
      valor_servico: number;
      percentual: number;
      valor_comissao: number;
    }>;
  }) {
    // Retorna a promessa do transacionamento inter-relacionado do Prisma
    return prisma.transacoes.create({
      data: {
        caixa_id,
        agendamento_id,
        tipo: 'servico',
        valor,
        forma_pagamento,
        descricao: 'Pagamento de Serviço de Agendamento',
        comissoes: {
          create: comissoes.map(comissao => ({
            barbeiros: { connect: { id: comissao.barbeiro_id } },
            valor_servico: comissao.valor_servico,
            percentual: comissao.percentual,
            valor_comissao: comissao.valor_comissao,
          })),
        },
      },
    });
  }

  async findByCaixa(caixa_id: string) {
    return prisma.transacoes.findMany({
      where: { caixa_id },
      include: {
        agendamentos: {
          include: {
            clientes: { select: { nome: true } }
          }
        }
      },
      orderBy: { criado_em: 'desc' }
    });
  }
}
