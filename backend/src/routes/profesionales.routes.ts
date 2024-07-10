import express from 'express';
import profesionalController from '../controllers/profesional.controller';
import { AuthGuard } from '../guards/auth.guard';

const router = express.Router();

router.post('/addProfesional', [profesionalController.addNewProfesional]);
router.get('/getOneProfesional', AuthGuard, [profesionalController.getOneProfesionalController]);
router.get('/getAllProfesionales', AuthGuard, [profesionalController.getAllProfesionalesControllers]);
router.put('/updateProfesional', AuthGuard, [ profesionalController.updateProfesional]);
router.post('/deleteProfesionales', AuthGuard, [profesionalController.deleteProfesionalesController]);

export default router;