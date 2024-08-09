import { Router } from 'express';
import usuariosRoutes from './usuarios.routes';
import pacientesRoutes from './pacientes.routes';
import profesionalesRoutes from './profesionales.routes';
import adminRoutes from './administradores.routes';
import cuestionarioRoutes from './cuestionarios.routes';
import planRoutes from './planseguridad.routes';
import recursoRoutes from './recursos.routes';
import eventoRoutes from './eventocalendario.routes';

const router = Router();

router.use('/usuarios', usuariosRoutes);
router.use('/pacientes', pacientesRoutes);
router.use('/profesionales', profesionalesRoutes);
router.use('/administradores', adminRoutes);
router.use('/cuestionarios', cuestionarioRoutes);
router.use('/plan', planRoutes);
router.use('/recurso', recursoRoutes);
router.use('/evento', eventoRoutes);

export default router;