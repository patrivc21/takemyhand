import express from 'express';
import cuestionarioController from '../controllers/cuestionarios.controller';
import { AuthGuard } from '../guards/auth.guard';

const router = express.Router();

router.post('/cuestionarioDepresion', AuthGuard, [cuestionarioController.cuestionarioProbabilidadEnDepresion]);
router.post('/cuestionarioPlutchik', AuthGuard, [cuestionarioController.cuestionarioPlutchik]);

export default router;