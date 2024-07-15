import express from 'express';
import profesionalController from '../controllers/profesional.controller';
import { AuthGuard } from '../guards/auth.guard';

const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: "assets/" });

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: 'assets' })

router.post('/addProfesional', [profesionalController.addNewProfesional]);
router.get('/getOneProfesional', AuthGuard, [profesionalController.getOneProfesionalController]);
router.get('/getAllProfesionales', AuthGuard, [profesionalController.getAllProfesionalesControllers]);
router.put('/updateProfesional', AuthGuard, [ profesionalController.updateProfesional]);
router.post('/deleteProfesionales', AuthGuard, [profesionalController.deleteProfesionalesController]);

router.post('/addPublicacion', AuthGuard, multipartMiddleware, [profesionalController.addPublicacionC]);
router.get('/getOnePubli', AuthGuard, [profesionalController.getOnePublicacionController]);
router.get('/getAllPublis', AuthGuard, [profesionalController.getAllPublicacionesControllers]);
router.post('/deletePubli', AuthGuard, [profesionalController.deletePublicacionesController]);

export default router;