import express from 'express';
import pacientesController from '../controllers/pacientes.controller';
import { AuthGuard } from '../guards/auth.guard';

const router = express.Router();

router.post('/addPaciente', [pacientesController.addNewPaciente]);
router.get('/getOnePaciente', AuthGuard, [pacientesController.getOnePacienteController]);
router.get('/getAllPacientes', AuthGuard, [pacientesController.getAllPacientesControllers]);
router.get('/getAllRoles', AuthGuard, [pacientesController.getAllRolesC]);
router.put('/updatePaciente', AuthGuard, [pacientesController.updatePaciente]);
router.post('/deletePacientes', AuthGuard, [pacientesController.deletePacientesController]);

export default router;