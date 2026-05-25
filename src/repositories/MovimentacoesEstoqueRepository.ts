import { prisma } from '../database';
import { movimentacoes_estoque_tipo } from '@prisma/client';

export class MovimentacoesEstoqueRepository {
  async registrar(data: {
    produto_id: string;
    tipo: movimentacoes_estoque_tipo;
    quantidade: number;
    motivo?: string;
  }) {
    // Usamos uma transação para garantir que o log da movimentação 
    // e o saldo do produto sejam atualizados de forma consistente.
    return prisma.$transaction(async (tx) => {
      // 1. Registrar o histórico da movimentação
      const movimentacao = await tx.movimentacoes_estoque.create({
        data: {
          produto_id: data.produto_id,
          tipo: data.tipo,
          quantidade: data.quantidade,
          motivo: data.motivo,
        },
      });

      // 2. Atualizar o saldo em estoque no cadastro do Produto
      const alteracaoEstoque = data.tipo === 'entrada' ? data.quantidade : -data.quantidade;

      await tx.produtos.update({
        where: { id: data.produto_id },
        data: {
          quantidade_estoque: {
            increment: alteracaoEstoque,
          },
          atualizado_em: new Date(),
        },
      });

      return movimentacao;
    });
  }
}
