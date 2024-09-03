import express from 'express';
import eventoController from '../controllers/eventocalendario.controller';
import { AuthGuard } from '../guards/auth.guard';

const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: "assets/" });

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: 'assets' })

router.post('/addEventoCalendario', [eventoController.addEventoCalendario]); //AuthGuard,
router.post('/updateEventoCalendario', [eventoController.updateEventoCalendario]); //AuthGuard,
router.post('/deleteEventoCalendario', [eventoController.deleteEventoCalendario]); //AuthGuard,
router.post('/getEventosUsuario', AuthGuard, [eventoController.getEventosUsuario]);
router.post('/getOneEvento', AuthGuard, [eventoController.getOneEventoC]);

export default router;