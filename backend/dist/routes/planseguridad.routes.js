"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var planseguridad_controller_1 = __importDefault(require("../controllers/planseguridad.controller"));
var auth_guard_1 = require("../guards/auth.guard");
var router = express_1.default.Router();
var multer = require('multer');
var upload = multer({ dest: "assets/" });
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: 'assets' });
router.post('/addPlan', auth_guard_1.AuthGuard, multipartMiddleware, [planseguridad_controller_1.default.addPlanSeguridadC]);
router.post('/getOnePlan', auth_guard_1.AuthGuard, [planseguridad_controller_1.default.getOpnePlanC]);
exports.default = router;
//# sourceMappingURL=planseguridad.routes.js.map