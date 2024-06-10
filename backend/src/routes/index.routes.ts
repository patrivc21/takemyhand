import { Router } from 'express';
import usuariosRoutes from './usuarios.routes';

const router = Router();

router.use('/usuarios', usuariosRoutes);

export default router;