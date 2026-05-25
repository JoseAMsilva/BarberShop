import { Router } from 'express';
import { ProdutosController } from '../controllers/ProdutosController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const produtosRoutes = Router();
const produtosController = new ProdutosController();

produtosRoutes.use(ensureAuthenticated);

produtosRoutes.get('/', produtosController.listar);
produtosRoutes.get('/alertas', produtosController.alertasEstoque);
produtosRoutes.post('/', produtosController.create);
produtosRoutes.post('/:id/movimentacoes', produtosController.movimentar);

export default produtosRoutes;
