"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarEstadoAnimoC = exports.addEstadoAnimoC = exports.deletePacientesController = exports.updatePaciente = exports.getAllRolesC = exports.getAllPacientesControllers = exports.getOnePacienteController = exports.addNewPaciente = void 0;
var RespGeneric_1 = __importDefault(require("../models/RespGeneric"));
var pacientes_service_1 = require("../services/pacientes.service");
var addNewPaciente = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, paciente, result, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                resp = new RespGeneric_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                paciente = req.body;
                return [4 /*yield*/, (0, pacientes_service_1.addPaciente)(paciente)];
            case 2:
                result = _a.sent();
                resp.msg = "Paciente anadido con exito";
                resp.cod = result ? 200 : 400;
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                resp.msg = e_1;
                resp.cod = 500;
                return [3 /*break*/, 4];
            case 4:
                res.json(resp);
                return [2 /*return*/];
        }
    });
}); };
exports.addNewPaciente = addNewPaciente;
var getOnePacienteController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, body, paciente, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                resp = new RespGeneric_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                body = req.body;
                return [4 /*yield*/, (0, pacientes_service_1.getOnePaciente)(body.id)];
            case 2:
                paciente = _a.sent();
                resp.data = { paciente: paciente };
                resp.cod = 200;
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                resp.msg = e_2;
                resp.cod = 500;
                return [3 /*break*/, 4];
            case 4:
                res.json(resp);
                return [2 /*return*/];
        }
    });
}); };
exports.getOnePacienteController = getOnePacienteController;
var getAllPacientesControllers = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, pacientes, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                resp = new RespGeneric_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, pacientes_service_1.getAllPacientes)()];
            case 2:
                pacientes = _a.sent();
                resp.data = { pacientes: pacientes };
                resp.cod = 200;
                return [3 /*break*/, 4];
            case 3:
                e_3 = _a.sent();
                resp.msg = e_3;
                resp.cod = 500;
                return [3 /*break*/, 4];
            case 4:
                res.json(resp);
                return [2 /*return*/];
        }
    });
}); };
exports.getAllPacientesControllers = getAllPacientesControllers;
var getAllRolesC = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var roles, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, pacientes_service_1.getAllRoles)()];
            case 1:
                roles = _a.sent();
                res.status(200).json({
                    message: "Roles obtenidos con éxito",
                    data: roles,
                });
                return [3 /*break*/, 3];
            case 2:
                e_4 = _a.sent();
                console.error('Error al obtener los roles:', e_4);
                res.status(500).json({
                    message: "Error al obtener los roles",
                    error: e_4 instanceof Error ? e_4.message : String(e_4),
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllRolesC = getAllRolesC;
var updatePaciente = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, pac, result, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                resp = new RespGeneric_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                pac = req.body;
                return [4 /*yield*/, (0, pacientes_service_1.updatePacientesService)(pac)];
            case 2:
                result = _a.sent();
                resp.cod = result ? 200 : 400;
                resp.data = { pacientes: result };
                return [3 /*break*/, 4];
            case 3:
                e_5 = _a.sent();
                resp.msg = e_5;
                resp.cod = 500;
                resp.data = { e: e_5 };
                return [3 /*break*/, 4];
            case 4:
                res.json(resp);
                return [2 /*return*/];
        }
    });
}); };
exports.updatePaciente = updatePaciente;
var deletePacientesController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, ids, result, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                resp = new RespGeneric_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                ids = req.body.ids;
                if (!ids || !Array.isArray(ids)) {
                    return [2 /*return*/, res.status(400).json({ message: 'Invalid request. Please provide an array of IDs.' })];
                }
                return [4 /*yield*/, (0, pacientes_service_1.deletePacientesService)(ids)];
            case 2:
                result = _a.sent();
                resp.cod = result ? 200 : 400;
                resp.data = { result: result };
                resp.msg = "Pacientes eliminados con exito.";
                return [3 /*break*/, 4];
            case 3:
                e_6 = _a.sent();
                resp.msg = e_6;
                resp.cod = 500;
                resp.msg = "Error al eliminar pacientes";
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deletePacientesController = deletePacientesController;
var addEstadoAnimoC = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, estado, result, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                resp = new RespGeneric_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                estado = req.body;
                return [4 /*yield*/, (0, pacientes_service_1.addEstadoAnimo)(estado)];
            case 2:
                result = _a.sent();
                return [4 /*yield*/, (0, pacientes_service_1.verificarEstadoAnimo)(estado.id_usuario)];
            case 3:
                _a.sent();
                resp.msg = "Estado paciente añadido con exito";
                resp.cod = result ? 200 : 400;
                return [3 /*break*/, 5];
            case 4:
                e_7 = _a.sent();
                resp.msg = e_7;
                resp.cod = 500;
                return [3 /*break*/, 5];
            case 5:
                res.json(resp);
                return [2 /*return*/];
        }
    });
}); };
exports.addEstadoAnimoC = addEstadoAnimoC;
var verificarEstadoAnimoC = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, id_usuario, e_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                resp = new RespGeneric_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                id_usuario = req.body.id_usuario;
                if (!id_usuario) {
                    resp.msg = "El ID del usuario es requerido";
                    resp.cod = 400;
                    return [2 /*return*/, res.json(resp)];
                }
                return [4 /*yield*/, (0, pacientes_service_1.verificarEstadoAnimo)(id_usuario)];
            case 2:
                _a.sent(); // Llama a la función que verifica el estado de ánimo
                resp.msg = "Verificación de estado de ánimo completada";
                resp.cod = 200;
                return [3 /*break*/, 4];
            case 3:
                e_8 = _a.sent();
                resp.msg = e_8;
                resp.cod = 500;
                return [3 /*break*/, 4];
            case 4:
                res.json(resp);
                return [2 /*return*/];
        }
    });
}); };
exports.verificarEstadoAnimoC = verificarEstadoAnimoC;
exports.default = { addNewPaciente: exports.addNewPaciente, getOnePacienteController: exports.getOnePacienteController, getAllPacientesControllers: exports.getAllPacientesControllers, getAllRolesC: exports.getAllRolesC, updatePaciente: exports.updatePaciente, deletePacientesController: exports.deletePacientesController, addEstadoAnimoC: exports.addEstadoAnimoC, verificarEstadoAnimoC: exports.verificarEstadoAnimoC
};
//# sourceMappingURL=pacientes.controller.js.map