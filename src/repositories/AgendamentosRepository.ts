import { prisma } from '../database';
import { Prisma } from '@prisma/client';

export class AgendamentosRepository {
  async create(data: Prisma.agendamentosCreateInput) {
    const agendamento = await prisma.agendamentos.create({
      data,
      include: {
        agendamento_servicos: true,
      },
    });
    return agendamento;
  }

  // Verifica se o barbeiro já tem um agendamento conflitando neste intervalo
  async findOverlappingByBarbeiro(barbeiroId: string, inicio: Date, fim: Date) {
    const conflito = await prisma.agendamentos.findFirst({
      where: {
        barbeiro_id: barbeiroId,
        status: {
          notIn: ['cancelado', 'nao_compareceu'], // Esses status liberam o horário
        },
        AND: [
          {
            data_hora_inicio: {
              lt: fim, // O início do agendamento existente é antes do fim do novo
            },
          },
          {
            data_hora_fim: {
              gt: inicio, // O fim do agendamento existente é depois do início do novo
            },
          },
        ],
      },
    });

    return conflito;
  }

  async findByClienteId(clienteId: string) {
    return prisma.agendamentos.findMany({
      where: { cliente_id: clienteId },
      include: {
        barbeiros: { select: { nome: true } },
        agendamento_servicos: {
          include: { servicos: { select: { nome: true, preco: true } } },
        },
      },
      orderBy: { data_hora_inicio: 'desc' },
    });
  }

  async findById(id: string) {
    return prisma.agendamentos.findUnique({
      where: { id },
      include: {
        agendamento_servicos: true,
      },
    });
  }
}
