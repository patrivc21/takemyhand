"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var eventocalendario_controller_1 = __importDefault(require("../controllers/eventocalendario.controller"));
var auth_guard_1 = require("../guards/auth.guard");
var router = express_1.default.Router();
var multer = require('multer');
var upload = multer({ dest: "assets/" });
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: 'assets' });
router.post('/addEventoCalendario', auth_guard_1.AuthGuard, [eventocalendario_controller_1.default.addEventoCalendario]);
router.post('/updateEventoCalendario', auth_guard_1.AuthGuard, [eventocalendario_controller_1.default.updateEventoCalendario]);
router.post('/deleteEventoCalendario', auth_guard_1.AuthGuard, [eventocalendario_controller_1.default.deleteEventoCalendario]);
router.post('/getEventosUsuario', auth_guard_1.AuthGuard, [eventocalendario_controller_1.default.getEventosUsuario]);
router.post('/getOneEvento', auth_guard_1.AuthGuard, [eventocalendario_controller_1.default.getOneEventoC]);
exports.default = router;
//# sourceMappingURL=eventocalendario.routes.js.map