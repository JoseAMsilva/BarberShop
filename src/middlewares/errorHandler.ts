import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/AppError';

export function errorHandler(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
): void {
  // Se for um erro que nós mesmos disparamos com AppError
  if (err instanceof AppError) {
    response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
    return;
  }

  // Se for um erro de validação do Zod
  if (err instanceof ZodError) {
    response.status(400).json({
      status: 'validation_error',
      message: 'Erro de validação nos dados enviados.',
      issues: err.format(),
    });
    return;
  }

  // Log do erro interno para monitoramento
  console.error('🔥 Erro Interno Capturado:', err);

  // Resposta padrão para erros não tratados
  response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
  return;
}
