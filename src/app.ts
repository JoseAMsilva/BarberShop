import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import { env } from './config/env';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// Configuração de segurança
app.use(helmet());

// Cross-Origin Resource Sharing
app.use(cors({
  origin: env.CORS_ORIGINS,
}));

// Parsing do body
app.use(express.json());

// Registro das rotas
app.use('/api/v1', routes);

// Middleware de erros DEVE vir depois das rotas
app.use(errorHandler);

export default app;
