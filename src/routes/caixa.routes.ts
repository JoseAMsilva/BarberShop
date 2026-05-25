import { Router } from 'express';
import { CaixaController } from '../controllers/CaixaController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const caixaRoutes = Router();
const caixaController = new CaixaController();

caixaRoutes.use(ensureAuthenticated);

caixaRoutes.get('/status', caixaController.status);
caixaRoutes.post('/abrir', caixaController.abrir);
caixaRoutes.post('/:id/fechar', caixaController.fechar);

export default caixaRoutes;
