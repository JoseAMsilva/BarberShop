import { Router } from 'express';
import { SessionsController } from '../controllers/SessionsController';

const sessionsRoutes = Router();
const sessionsController = new SessionsController();

// Login / Gerar Token
sessionsRoutes.post('/', sessionsController.create);

export default sessionsRoutes;
