import express from 'express';
import pacientesController from '../controllers/pacientes.controller';
import { AuthGuard } from '../guards/auth.guard';

const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: "assets/" });

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: 'assets' })

router.post('/addPaciente', [pacientesController.addNewPaciente]);
router.get('/getOnePaciente', AuthGuard, [pacientesController.getOnePacienteController]);
router.get('/getAllPacientes', AuthGuard, [pacientesController.getAllPacientesControllers]);
router.get('/getAllRoles', AuthGuard, [pacientesController.getAllRolesC]);
router.put('/updatePaciente', AuthGuard, [pacientesController.updatePaciente]);
router.post('/deletePacientes', AuthGuard, [pacientesController.deletePacientesController]);

router.post('/addPublicacion', AuthGuard, multipartMiddleware, [pacientesController.addPublicacionC]);
router.get('/getOnePubli', AuthGuard, [pacientesController.getOnePublicacionController]);
router.get('/getAllPublis', AuthGuard, [pacientesController.getAllPublicacionesControllers]);
router.post('/deletePubli', AuthGuard, [pacientesController.deletePublicacionesController]);

export default router;