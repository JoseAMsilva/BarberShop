import { ProdutosRepository } from '../repositories/ProdutosRepository';
import { AppError } from '../errors/AppError';

interface IRequest {
  nome: string;
  descricao?: string;
  preco_custo: number;
  preco_venda: number;
  estoque_minimo?: number;
}

export class CreateProdutoService {
  async execute(data: IRequest) {
    if (data.preco_venda < data.preco_custo) {
      throw new AppError('O preço de venda não pode ser menor que o preço de custo.');
    }

    const produtosRepository = new ProdutosRepository();
    
    const produto = await produtosRepository.create({
      nome: data.nome,
      descricao: data.descricao,
      preco_custo: data.preco_custo,
      preco_venda: data.preco_venda,
      estoque_minimo: data.estoque_minimo || 5,
      quantidade_estoque: 0, // Todo produto nasce com zero estoque. A entrada se dá pela movimentação
    });

    return produto;
  }
}
