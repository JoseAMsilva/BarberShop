import { Router } from 'express';
import { TransacoesController } from '../controllers/TransacoesController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const transacoesRoutes = Router();
const transacoesController = new TransacoesController();

transacoesRoutes.use(ensureAuthenticated);

transacoesRoutes.post('/pagamento', transacoesController.registrarPagamento);
transacoesRoutes.get('/caixa/:caixa_id', transacoesController.listarPorCaixa);

export default transacoesRoutes;
