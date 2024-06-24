import express from 'express';
import profesionalController from '../controllers/profesional.controller';
import { AuthGuard } from '../guards/auth.guard';

const router = express.Router();

router.post('/addProfesional', [profesionalController.addNewProfesional]);
router.get('/getOneProfesional', [profesionalController.getOneProfesionalController]);
router.get('/getAllProfesionales', [profesionalController.getAllProfesionalesControllers]);
router.put('/updateProfesional', [AuthGuard, profesionalController.updateProfesional]);

export default router;