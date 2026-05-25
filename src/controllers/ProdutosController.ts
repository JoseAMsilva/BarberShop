import { Request, Response } from 'express';
import { z } from 'zod';
import { CreateProdutoService } from '../services/CreateProdutoService';
import { RegistrarMovimentacaoEstoqueService } from '../services/RegistrarMovimentacaoEstoqueService';
import { ProdutosRepository } from '../repositories/ProdutosRepository';

export class ProdutosController {
  async create(request: Request, response: Response) {
    const produtoSchema = z.object({
      nome: z.string().min(2),
      descricao: z.string().optional(),
      preco_custo: z.number().min(0),
      preco_venda: z.number().min(0),
      estoque_minimo: z.number().int().min(1).optional(),
    });

    const data = produtoSchema.parse(request.body);

    const createProdutoService = new CreateProdutoService();
    const produto = await createProdutoService.execute(data);

    response.status(201).json(produto);
  }

  async movimentar(request: Request, response: Response) {
    const movimentacaoSchema = z.object({
      tipo: z.enum(['entrada', 'saida', 'ajuste']),
      quantidade: z.number().int().positive(),
      motivo: z.string().optional(),
    });

    const { id } = request.params;
    const data = movimentacaoSchema.parse(request.body);

    const registrarMovimentacaoService = new RegistrarMovimentacaoEstoqueService();
    const movimentacao = await registrarMovimentacaoService.execute({
      produto_id: id,
      ...data,
    });

    response.status(201).json(movimentacao);
  }

  async listar(request: Request, response: Response) {
    const produtosRepository = new ProdutosRepository();
    const produtos = await produtosRepository.findAll();

    response.json(produtos);
  }

  async alertasEstoque(request: Request, response: Response) {
    const produtosRepository = new ProdutosRepository();
    const produtosBaixoEstoque = await produtosRepository.getEstoqueBaixo();

    response.json(produtosBaixoEstoque);
  }
}
