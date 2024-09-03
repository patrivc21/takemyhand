import express from 'express';
import profesionalController from '../controllers/profesional.controller';
import { AuthGuard } from '../guards/auth.guard';

const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: "assets/" });

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: 'assets' })

router.post('/addProfesional', [profesionalController.addNewProfesional]);
router.post('/getOneProfesional', AuthGuard, [profesionalController.getOneProfesionalController]);
router.get('/getAllProfesionales', AuthGuard, [profesionalController.getAllProfesionalesControllers]);
router.post('/updateProfesional', AuthGuard, [ profesionalController.updateProfesional]);
router.post('/deleteProfesionales', AuthGuard, [profesionalController.deleteProfesionalesController]);

router.post('/addPublicacion',  AuthGuard, multipartMiddleware, [profesionalController.addPublicacionC]);
router.post('/getOnePubli',  AuthGuard, [profesionalController.getOnePublicacionController]);
router.get('/getAllPublis',  AuthGuard, [profesionalController.getAllPublicacionesControllers]);
router.post('/deletePubli', AuthGuard, [profesionalController.deletePublicacionesController]);
router.post('/buscar', AuthGuard, [profesionalController.buscarC]);
router.post('/getPublisUser', [profesionalController.getAllPublisUser]);
router.post('/updatePubli', AuthGuard, [profesionalController.updatePublicaciones]);

router.post('/addRecursos',  AuthGuard, multipartMiddleware, [profesionalController.addRecursosC]);

router.get('/getCiudades', AuthGuard, [profesionalController.getAllCiudades]);
router.post('/getProfByCiudad', AuthGuard, [profesionalController.getProfByCiudadC]);

router.post('/addRespuesta', multipartMiddleware, [profesionalController.addRespuesta]);
router.post('/getRespuestas', [profesionalController.getRespuestasC]);

export default router;