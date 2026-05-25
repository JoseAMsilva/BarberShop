import { Router } from 'express';
import { AgendamentosController } from '../controllers/AgendamentosController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const agendamentosRoutes = Router();
const agendamentosController = new AgendamentosController();

// Todas as rotas de agendamento exigem que o usuário esteja logado (JWT)
agendamentosRoutes.use(ensureAuthenticated);

// Cria um novo agendamento
agendamentosRoutes.post('/', agendamentosController.create);

export default agendamentosRoutes;
