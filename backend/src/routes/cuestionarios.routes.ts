import express from 'express';
import cuestionarioController from '../controllers/cuestionarios.controller';
import { AuthGuard } from '../guards/auth.guard';

const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: "assets/" });

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: 'assets' })

router.post('/cuestionarioDepresion', [cuestionarioController.cuestionarioProbabilidadEnDepresion]);
router.post('/cuestionarioPlutchik', [cuestionarioController.cuestionarioPlutchik]);

router.post('/addPlan', multipartMiddleware, [cuestionarioController.addPlanSeguridadC]);
router.post('/getOnePlan', [cuestionarioController.getOpnePlanC]);

export default router;