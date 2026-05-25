import { Router } from 'express';
import { ClientesController } from '../controllers/ClientesController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const clientesRoutes = Router();
const clientesController = new ClientesController();

// Criação de conta (público)
clientesRoutes.post('/', clientesController.create);

// Ver o próprio perfil (privado - exige JWT)
clientesRoutes.get('/me', ensureAuthenticated, clientesController.show);

export default clientesRoutes;
