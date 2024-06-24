"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var administrador_controller_1 = __importDefault(require("../controllers/administrador.controller"));
var auth_guard_1 = require("../guards/auth.guard");
var router = express_1.default.Router();
router.post('/addAdmin', [administrador_controller_1.default.addNewAdmin]);
router.get('/getOneAdmin', [administrador_controller_1.default.getOneAdminController]);
router.get('/getAllAdministradores', [administrador_controller_1.default.getAllAdministradoresControllers]);
router.post('/deletePaciente', [auth_guard_1.AuthGuard, administrador_controller_1.default.deletePaciente]);
router.post('/deleteProfesional', [auth_guard_1.AuthGuard, administrador_controller_1.default.deleteProfesional]);
exports.default = router;
//# sourceMappingURL=administradores.routes.js.map