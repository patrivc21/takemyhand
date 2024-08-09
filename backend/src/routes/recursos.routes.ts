import express from 'express';
import { AuthGuard } from '../guards/auth.guard';
import recursosController from '../controllers/recursos.controller';

const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: "assets/" });

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: 'assets' })

router.get('/getAllRecursos', [recursosController.getAllRecursos]);  //AuthGuard,

export default router;