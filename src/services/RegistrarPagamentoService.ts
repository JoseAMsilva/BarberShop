import { CaixaRepository } from '../repositories/CaixaRepository';
import { TransacoesRepository } from '../repositories/TransacoesRepository';
import { AgendamentosRepository } from '../repositories/AgendamentosRepository';
import { AppError } from '../errors/AppError';
import { transacoes_forma_pagamento } from '@prisma/client';

interface IRequest {
  agendamento_id: string;
  forma_pagamento: transacoes_forma_pagamento;
}

export class RegistrarPagamentoService {
  async execute({ agendamento_id, forma_pagamento }: IRequest) {
    const caixaRepository = new CaixaRepository();
    const transacoesRepository = new TransacoesRepository();
    const agendamentosRepository = new AgendamentosRepository();

    // 1. Validar se existe caixa aberto
    const caixa = await caixaRepository.getCaixaAberto();
    if (!caixa) {
      throw new AppError('Não existe um caixa aberto para registrar o pagamento.', 400);
    }

    // 2. Busca o agendamento e seus serviços vinculados
    const agendamento = await agendamentosRepository.findById(agendamento_id);
    if (!agendamento) {
      throw new AppError('Agendamento não encontrado.', 404);
    }

    if (agendamento.status === 'concluido' || agendamento.status === 'cancelado') {
      throw new AppError('Este agendamento já foi concluído ou cancelado.', 400);
    }

    // 3. O Barbeiro que realizou o corte
    const barbeiro_id = agendamento.barbeiro_id;
    // Em uma aplicação real, a comissão viria do banco (tabela barbeiro), usaremos um valor de teste (ex: 50%)
    const percentual_comissao = 50; 

    // 4. Calcular os totais e criar a estrutura de comissões
    let valorTotalAgendamento = 0;
    const comissoesArr = [];

    for (const agendamentoServico of agendamento.agendamento_servicos) {
      const preco = Number(agendamentoServico.preco_cobrado);
      valorTotalAgendamento += preco;

      const valorComissao = (preco * percentual_comissao) / 100;

      comissoesArr.push({
        barbeiro_id,
        valor_servico: preco,
        percentual: percentual_comissao,
        valor_comissao: valorComissao,
      });
    }

    // 5. Registra o Pagamento (Transação) + Comissões na mesma operação atômica (Transaction via Prisma)
    const transacao = await transacoesRepository.registrarPagamentoComComissao({
      caixa_id: caixa.id,
      agendamento_id,
      valor: valorTotalAgendamento,
      forma_pagamento,
      comissoes: comissoesArr,
    });

    return transacao;
  }
}
