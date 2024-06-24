"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var pacientes_controller_1 = __importDefault(require("../controllers/pacientes.controller"));
var auth_guard_1 = require("../guards/auth.guard");
var router = express_1.default.Router();
router.post('/addPaciente', [pacientes_controller_1.default.addNewPaciente]);
router.get('/getOnePaciente', [pacientes_controller_1.default.getOnePacienteController]);
router.get('/getAllPacientes', [pacientes_controller_1.default.getAllPacientesControllers]);
router.get('/getAllRoles', [pacientes_controller_1.default.getAllRolesC]);
router.put('/updatePaciente', [auth_guard_1.AuthGuard, pacientes_controller_1.default.updatePaciente]);
exports.default = router;
//# sourceMappingURL=pacientes.routes.js.map