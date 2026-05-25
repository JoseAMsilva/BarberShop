import { AgendamentosRepository } from '../repositories/AgendamentosRepository';
import { ServicosRepository } from '../repositories/ServicosRepository';
import { AppError } from '../errors/AppError';
import { Prisma } from '@prisma/client';

interface IRequest {
  cliente_id: string;
  barbeiro_id: string;
  servicos_ids: string[];
  data_hora_inicio: Date;
  observacoes?: string;
}

export class CreateAgendamentoService {
  private agendamentosRepository: AgendamentosRepository;
  private servicosRepository: ServicosRepository;

  constructor() {
    this.agendamentosRepository = new AgendamentosRepository();
    this.servicosRepository = new ServicosRepository();
  }

  async execute({ cliente_id, barbeiro_id, servicos_ids, data_hora_inicio, observacoes }: IRequest) {
    // 1. O agendamento não pode ser no passado
    if (data_hora_inicio.getTime() < Date.now()) {
      throw new AppError('Não é possível agendar em uma data/hora que já passou.');
    }

    // 2. Busca os serviços solicitados
    const servicos = await this.servicosRepository.findByIds(servicos_ids);

    if (servicos.length !== servicos_ids.length) {
      throw new AppError('Um ou mais serviços selecionados não existem ou estão inativos.', 404);
    }

    // 3. Calcula a duração total e o término do agendamento
    const duracaoTotalMinutos = servicos.reduce((acc, servico) => acc + servico.duracao_minutos, 0);
    
    const data_hora_fim = new Date(data_hora_inicio);
    data_hora_fim.setMinutes(data_hora_fim.getMinutes() + duracaoTotalMinutos);

    // 4. Verifica conflitos de horário para o Barbeiro
    const conflito = await this.agendamentosRepository.findOverlappingByBarbeiro(
      barbeiro_id,
      data_hora_inicio,
      data_hora_fim
    );

    if (conflito) {
      throw new AppError('O barbeiro já possui um agendamento neste horário.', 409);
    }

    // 5. Prepara os dados para inserção usando Transações implícitas do Prisma via relação
    const agendamentoData: Prisma.agendamentosCreateInput = {
      clientes: { connect: { id: cliente_id } },
      barbeiros: { connect: { id: barbeiro_id } },
      data_hora_inicio,
      data_hora_fim,
      status: 'agendado',
      observacoes,
      agendamento_servicos: {
        create: servicos.map(servico => ({
          servicos: { connect: { id: servico.id } },
          preco_cobrado: servico.preco, // Congela o preço no ato do agendamento
        })),
      },
    };

    // 6. Cria o Agendamento no banco
    const agendamento = await this.agendamentosRepository.create(agendamentoData);

    return agendamento;
  }
}
