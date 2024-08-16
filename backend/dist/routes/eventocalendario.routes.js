"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var eventocalendario_controller_1 = __importDefault(require("../controllers/eventocalendario.controller"));
var router = express_1.default.Router();
var multer = require('multer');
var upload = multer({ dest: "assets/" });
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: 'assets' });
router.post('/addEventoCalendario', [eventocalendario_controller_1.default.addEventoCalendario]); //AuthGuard,
router.post('/updateEventoCalendario', [eventocalendario_controller_1.default.updateEventoCalendario]); //AuthGuard,
router.post('/deleteEventoCalendario', [eventocalendario_controller_1.default.deleteEventoCalendario]); //AuthGuard,
router.post('/getEventosUsuario', [eventocalendario_controller_1.default.getEventosUsuario]);
exports.default = router;
//# sourceMappingURL=eventocalendario.routes.js.map