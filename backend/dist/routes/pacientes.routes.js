"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var pacientes_controller_1 = __importDefault(require("../controllers/pacientes.controller"));
// import { AuthGuard } from '../guards/auth.guard';
var router = express_1.default.Router();
router.post('/addPaciente', [pacientes_controller_1.default.addNewPaciente]);
router.get('/getOnePaciente', [pacientes_controller_1.default.getOnePacienteController]);
router.get('/getAllPacientes', [pacientes_controller_1.default.getAllPacientesControllers]);
exports.default = router;
//# sourceMappingURL=pacientes.routes.js.map