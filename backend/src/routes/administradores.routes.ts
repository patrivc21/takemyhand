import express from 'express';
import adminController from '../controllers/administrador.controller';

import cuestionarioController from '../controllers/cuestionarios.controller';
import { AuthGuard } from '../guards/auth.guard';

const router = express.Router();

router.post('/addAdmin', [adminController.addNewAdmin]);
router.get('/getOneAdmin', AuthGuard, [adminController.getOneAdminController]);
router.get('/getAllAdministradores', AuthGuard, [adminController.getAllAdministradoresControllers]);
router.post('/deletePaciente', AuthGuard, [AuthGuard, adminController.deletePaciente]);
router.post('/deleteProfesional', AuthGuard, [AuthGuard, adminController.deleteProfesional]);

export default router;