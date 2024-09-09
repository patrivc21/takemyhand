import express from 'express';
import eventoController from '../controllers/eventocalendario.controller';
import { AuthGuard } from '../guards/auth.guard';

const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: "assets/" });

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: 'assets' })

router.post('/addEventoCalendario', AuthGuard, [eventoController.addEventoCalendario]); 
router.post('/updateEventoCalendario', AuthGuard, [eventoController.updateEventoCalendario]); 
router.post('/deleteEventoCalendario', AuthGuard, [eventoController.deleteEventoCalendario]);
router.post('/getEventosUsuario', AuthGuard, [eventoController.getEventosUsuario]);
router.post('/getOneEvento', AuthGuard, [eventoController.getOneEventoC]);

export default router;