import express from 'express';
import planController from '../controllers/planseguridad.controller';
import { AuthGuard } from '../guards/auth.guard';

const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: "assets/" });

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: 'assets' })

router.post('/addPlan', AuthGuard, multipartMiddleware, [planController.addPlanSeguridadC]);
router.post('/getOnePlan',  [planController.getOpnePlanC]);

export default router;