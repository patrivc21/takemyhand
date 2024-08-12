"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var profesional_controller_1 = __importDefault(require("../controllers/profesional.controller"));
var auth_guard_1 = require("../guards/auth.guard");
var router = express_1.default.Router();
var multer = require('multer');
var upload = multer({ dest: "assets/" });
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: 'assets' });
router.post('/addProfesional', [profesional_controller_1.default.addNewProfesional]);
router.get('/getOneProfesional', auth_guard_1.AuthGuard, [profesional_controller_1.default.getOneProfesionalController]);
router.get('/getAllProfesionales', auth_guard_1.AuthGuard, [profesional_controller_1.default.getAllProfesionalesControllers]);
router.put('/updateProfesional', auth_guard_1.AuthGuard, [profesional_controller_1.default.updateProfesional]);
router.post('/deleteProfesionales', auth_guard_1.AuthGuard, [profesional_controller_1.default.deleteProfesionalesController]);
router.post('/addPublicacion', auth_guard_1.AuthGuard, multipartMiddleware, [profesional_controller_1.default.addPublicacionC]);
router.post('/getOnePubli', auth_guard_1.AuthGuard, [profesional_controller_1.default.getOnePublicacionController]);
router.get('/getAllPublis', auth_guard_1.AuthGuard, [profesional_controller_1.default.getAllPublicacionesControllers]);
router.post('/deletePubli', auth_guard_1.AuthGuard, [profesional_controller_1.default.deletePublicacionesController]);
router.post('/buscar', auth_guard_1.AuthGuard, [profesional_controller_1.default.buscarC]);
router.post('/addRecursos', auth_guard_1.AuthGuard, multipartMiddleware, [profesional_controller_1.default.addRecursosC]);
router.get('/getCiudades', [profesional_controller_1.default.getAllCiudades]);
router.post('/getProfByCiudad', [profesional_controller_1.default.getProfByCiudadC]);
exports.default = router;
//# sourceMappingURL=profesionales.routes.js.map