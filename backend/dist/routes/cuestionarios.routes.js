"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cuestionarios_controller_1 = __importDefault(require("../controllers/cuestionarios.controller"));
var router = express_1.default.Router();
var multer = require('multer');
var upload = multer({ dest: "assets/" });
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: 'assets' });
router.post('/cuestionarioDepresion', [cuestionarios_controller_1.default.cuestionarioProbabilidadEnDepresion]);
router.post('/cuestionarioPlutchik', [cuestionarios_controller_1.default.cuestionarioPlutchik]);
router.post('/addPlan', multipartMiddleware, [cuestionarios_controller_1.default.addPlanSeguridadC]);
router.post('/getOnePlan', [cuestionarios_controller_1.default.getOpnePlanC]);
exports.default = router;
//# sourceMappingURL=cuestionarios.routes.js.map