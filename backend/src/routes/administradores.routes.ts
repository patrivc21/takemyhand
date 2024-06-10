import express from 'express';
import adminController from '../controllers/administrador.controller';
// import { AuthGuard } from '../guards/auth.guard';

const router = express.Router();

router.post('/addAdmin', [adminController.addNewAdmin]);
router.get('/getOneAdmin', [adminController.getOneAdminController]);
router.get('/getAllAdministradores', [adminController.getAllAdministradoresControllers]);

export default router;