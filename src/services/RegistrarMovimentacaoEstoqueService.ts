import { MovimentacoesEstoqueRepository } from '../repositories/MovimentacoesEstoqueRepository';
import { ProdutosRepository } from '../repositories/ProdutosRepository';
import { AppError } from '../errors/AppError';
import { movimentacoes_estoque_tipo } from '@prisma/client';

interface IRequest {
  produto_id: string;
  tipo: movimentacoes_estoque_tipo;
  quantidade: number;
  motivo?: string;
}

export class RegistrarMovimentacaoEstoqueService {
  async execute({ produto_id, tipo, quantidade, motivo }: IRequest) {
    if (quantidade <= 0) {
      throw new AppError('A quantidade da movimentação deve ser maior que zero.');
    }

    const produtosRepository = new ProdutosRepository();
    const produto = await produtosRepository.findById(produto_id);

    if (!produto) {
      throw new AppError('Produto não encontrado.', 404);
    }

    // Se for saída, não pode sair mais do que tem (evitar estoque negativo)
    if (tipo === 'saida' && produto.quantidade_estoque < quantidade) {
      throw new AppError('Estoque insuficiente para realizar esta saída.', 400);
    }

    const movimentacoesRepository = new MovimentacoesEstoqueRepository();
    
    // Registra a movimentação e sincroniza o estoque em cascata (Transaction)
    const movimentacao = await movimentacoesRepository.registrar({
      produto_id,
      tipo,
      quantidade,
      motivo,
    });

    return movimentacao;
  }
}
