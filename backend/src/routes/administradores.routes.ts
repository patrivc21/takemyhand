import express from 'express';
import adminController from '../controllers/administrador.controller';

import cuestionarioController from '../controllers/cuestionarios.controller';
import { AuthGuard } from '../guards/auth.guard';

const router = express.Router();

router.post('/addAdmin', [adminController.addNewAdmin]);
router.get('/getOneAdmin', [adminController.getOneAdminController]);
router.get('/getAllAdministradores', [adminController.getAllAdministradoresControllers]);
router.post('/deletePaciente', [AuthGuard, adminController.deletePaciente]);
router.post('/deleteProfesional', [AuthGuard, adminController.deleteProfesional]);

export default router;