import { Router } from 'express';
import clientesRoutes from './clientes.routes';
import sessionsRoutes from './sessions.routes';

import agendamentosRoutes from './agendamentos.routes';
import caixaRoutes from './caixa.routes';
import transacoesRoutes from './transacoes.routes';
import produtosRoutes from './produtos.routes';

const routes = Router();

routes.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

routes.use('/clientes', clientesRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/agendamentos', agendamentosRoutes);
routes.use('/caixa', caixaRoutes);
routes.use('/transacoes', transacoesRoutes);
routes.use('/produtos', produtosRoutes);

export default routes;
