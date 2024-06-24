import { Router } from 'express';
import usuariosRoutes from './usuarios.routes';
import pacientesRoutes from './pacientes.routes';
import profesionalesRoutes from './profesionales.routes';

const router = Router();

router.use('/usuarios', usuariosRoutes);
router.use('/pacientes', pacientesRoutes);
router.use('/profesionales', profesionalesRoutes);

export default router;