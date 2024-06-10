import express from 'express';
import pacientesController from '../controllers/pacientes.controller';
// import { AuthGuard } from '../guards/auth.guard';

const router = express.Router();

router.post('/addPaciente', [pacientesController.addNewPaciente]);
router.get('/getOnePaciente', [pacientesController.getOnePacienteController]);
router.get('/getAllPacientes', [pacientesController.getAllPacientesControllers]);

export default router;