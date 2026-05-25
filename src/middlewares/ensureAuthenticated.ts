import { Request, Response, NextFunction } from 'express';
import { jwtVerify } from 'jose';
import { AppError } from '../errors/AppError';
import { env } from '../config/env';

// Estende a interface do Request do Express para aceitar os dados do usuário autenticado
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token JWT está faltando.', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const secret = new TextEncoder().encode(env.JWT_SECRET);
    
    // Verifica a validade do token e extrai o payload
    const { payload } = await jwtVerify(token, secret);

    // Repassa o ID do usuário (subject) para o resto da requisição
    request.user = {
      id: payload.sub as string,
    };

    return next();
  } catch (error) {
    throw new AppError('Token JWT inválido ou expirado.', 401);
  }
}
