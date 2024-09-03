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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarEstadoAnimo = exports.addEstadoAnimo = exports.updatePacientesResultService = exports.deletePacientesService = exports.deleteOnePacienteService = exports.updatePacientesService = exports.getAllRoles = exports.getAllPacientes = exports.getOnePaciente = exports.addPaciente = exports.addUsuarios = void 0;
var Pacientes_1 = require("../entities/Pacientes");
var typeorm_1 = require("../config/typeorm");
var typeorm_2 = require("typeorm");
var Usuarios_1 = require("../entities/Usuarios");
var LoginRegister_1 = require("../entities/LoginRegister");
var mail_helper_1 = require("../helpers/mail.helper");
var PlanSeguridad_1 = require("../entities/PlanSeguridad");
var addUsuarios = function (usuarios) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.DB.getRepository(Usuarios_1.Usuarios).save(usuarios)];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res != null];
        }
    });
}); };
exports.addUsuarios = addUsuarios;
var addPaciente = function (admin) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.DB.getRepository(Pacientes_1.Pacientes).save(admin)];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res != null];
        }
    });
}); };
exports.addPaciente = addPaciente;
var getOnePaciente = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.DB.getRepository(Pacientes_1.Pacientes).findOne({
                    where: [
                        { id: id }
                    ]
                })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res];
        }
    });
}); };
exports.getOnePaciente = getOnePaciente;
var getAllPacientes = function () { return __awaiter(void 0, void 0, void 0, function () {
    var pacientes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.DB.getRepository(Pacientes_1.Pacientes)
                    .createQueryBuilder('paciente')
                    .leftJoinAndSelect('paciente.rolPaciente', 'rolPaciente')
                    .select(['paciente', 'rolPaciente.nombre'])
                    .getRawMany()];
            case 1:
                pacientes = _a.sent();
                return [2 /*return*/, pacientes];
        }
    });
}); };
exports.getAllPacientes = getAllPacientes;
var getAllRoles = function () { return __awaiter(void 0, void 0, void 0, function () {
    var roles;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.DB.getRepository(Pacientes_1.Pacientes).find()];
            case 1:
                roles = _a.sent();
                return [2 /*return*/, roles];
        }
    });
}); };
exports.getAllRoles = getAllRoles;
var updatePacientesService = function (paciente) { return __awaiter(void 0, void 0, void 0, function () {
    var pacToUpdate, resp;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.DB.getRepository(Pacientes_1.Pacientes).findOneBy({ email: paciente.email })];
            case 1:
                pacToUpdate = _a.sent();
                resp = null;
                if (!pacToUpdate) return [3 /*break*/, 3];
                Object.assign(pacToUpdate, paciente);
                return [4 /*yield*/, typeorm_1.DB.getRepository(Pacientes_1.Pacientes).save(pacToUpdate)];
            case 2:
                resp = _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/, resp != null];
        }
    });
}); };
exports.updatePacientesService = updatePacientesService;
var deleteOnePacienteService = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var pacToEliminate, resp;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.DB.getRepository(Pacientes_1.Pacientes).findOneBy({ id: id })];
            case 1:
                pacToEliminate = _a.sent();
                resp = null;
                if (!pacToEliminate) return [3 /*break*/, 3];
                return [4 /*yield*/, typeorm_1.DB.getRepository(Pacientes_1.Pacientes).remove(pacToEliminate)];
            case 2:
                resp = _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/, resp != null];
        }
    });
}); };
exports.deleteOnePacienteService = deleteOnePacienteService;
var deletePacientesService = function (ids) { return __awaiter(void 0, void 0, void 0, function () {
    var deleteResult, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, typeorm_1.DB.getRepository(Pacientes_1.Pacientes).delete(ids)];
            case 1:
                deleteResult = _a.sent();
                return [2 /*return*/, deleteResult.affected != null];
            case 2:
                error_1 = _a.sent();
                console.error('Error deleting patients:', error_1);
                return [2 /*return*/, false];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deletePacientesService = deletePacientesService;
var updatePacientesResultService = function (id_usuario, resultado) { return __awaiter(void 0, void 0, void 0, function () {
    var pacToUpdate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.DB.getRepository(Pacientes_1.Pacientes).findOneBy({ id_usuario: id_usuario })];
            case 1:
                pacToUpdate = _a.sent();
                if (!pacToUpdate) return [3 /*break*/, 3];
                pacToUpdate.resultado_formulario = resultado;
                return [4 /*yield*/, typeorm_1.DB.getRepository(Pacientes_1.Pacientes).save(pacToUpdate)];
            case 2:
                _a.sent();
                return [2 /*return*/, true];
            case 3: return [2 /*return*/, false];
        }
    });
}); };
exports.updatePacientesResultService = updatePacientesResultService;
var addEstadoAnimo = function (estado) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.DB.getRepository(LoginRegister_1.LoginRegister).save(estado)];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res != null];
        }
    });
}); };
exports.addEstadoAnimo = addEstadoAnimo;
var verificarEstadoAnimo = function (id_usuario) { return __awaiter(void 0, void 0, void 0, function () {
    var fechaActual, fechaHaceCincoDias, registros, usuario, planSeguridad, emails, _i, emails_1, email, paciente;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                fechaActual = new Date();
                fechaHaceCincoDias = new Date();
                fechaHaceCincoDias.setDate(fechaActual.getDate() - 5);
                return [4 /*yield*/, typeorm_1.DB.getRepository(LoginRegister_1.LoginRegister).find({
                        where: {
                            id_usuario: id_usuario,
                            fecha: (0, typeorm_2.Between)(fechaHaceCincoDias, fechaActual),
                        },
                        order: {
                            fecha: 'ASC',
                        },
                    })];
            case 1:
                registros = _b.sent();
                return [4 /*yield*/, typeorm_1.DB.getRepository(Usuarios_1.Usuarios).findOne({
                        where: {
                            id: id_usuario
                        },
                        select: ['nombre', 'apellidos']
                    })];
            case 2:
                usuario = _b.sent();
                if (!(registros.length >= 5 && registros.every(function (registro) { return registro.estado <= 3; }))) return [3 /*break*/, 11];
                return [4 /*yield*/, typeorm_1.DB.getRepository(PlanSeguridad_1.PlanSeguridad).findOne({
                        where: { id_usuario: id_usuario }
                    })];
            case 3:
                planSeguridad = _b.sent();
                if (!(planSeguridad && planSeguridad.emails)) return [3 /*break*/, 8];
                emails = planSeguridad.emails.includes(',')
                    ? planSeguridad.emails.split(',').map(function (email) { return email.trim(); }) // Si hay comas, separar los emails y eliminarlas
                    : [planSeguridad.emails.trim()];
                _i = 0, emails_1 = emails;
                _b.label = 4;
            case 4:
                if (!(_i < emails_1.length)) return [3 /*break*/, 7];
                email = emails_1[_i];
                return [4 /*yield*/, (0, mail_helper_1.sendEmail)(email.trim(), "Alerta: Estado de ánimo bajo", "Estimado/a familiar/amigo/conocido,\n\n" +
                        "Le informamos que ".concat(usuario === null || usuario === void 0 ? void 0 : usuario.nombre, " ").concat(usuario === null || usuario === void 0 ? void 0 : usuario.apellidos, " ha reportado un estado de \u00E1nimo bajo durante 5 d\u00EDas consecutivos en nuestra aplicaci\u00F3n de salud mental.\n\n") +
                        "Dado que el bienestar de nuestros usuarios es nuestra m\u00E1xima prioridad, consideramos importante que est\u00E9 al tanto de esta situaci\u00F3n para que pueda brindarle el apoyo necesario. Le recomendamos que se comunique con ".concat(usuario === null || usuario === void 0 ? void 0 : usuario.nombre, " ").concat(usuario === null || usuario === void 0 ? void 0 : usuario.apellidos, " para ofrecerle su ayuda y, si lo considera oportuno, consultar con un profesional de la salud mental.\n\n") +
                        "Si necesita m\u00E1s informaci\u00F3n o apoyo, no dude en ponerse en contacto con nosotros.\n\n" +
                        "Atentamente,\n" +
                        "El equipo de Take My Hand.")];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 4];
            case 7: return [3 /*break*/, 11];
            case 8: return [4 /*yield*/, typeorm_1.DB.getRepository(Pacientes_1.Pacientes).findOne({
                    where: { id_usuario: id_usuario },
                    relations: ['profesional_asociado']
                })];
            case 9:
                paciente = _b.sent();
                if (!((_a = paciente === null || paciente === void 0 ? void 0 : paciente.profesional_asociado) === null || _a === void 0 ? void 0 : _a.email)) return [3 /*break*/, 11];
                // 8. Enviar un correo al profesional asignado
                return [4 /*yield*/, (0, mail_helper_1.sendEmail)(paciente.profesional_asociado.email, "Alerta: Estado de ánimo bajo", "Estimado/a profesional,\n\n" +
                        "Le informamos que su paciente ".concat(usuario === null || usuario === void 0 ? void 0 : usuario.nombre, " ").concat(usuario === null || usuario === void 0 ? void 0 : usuario.apellidos, " ha reportado un estado de \u00E1nimo bajo durante 5 d\u00EDas consecutivos en nuestra aplicaci\u00F3n de salud mental.\n\n") +
                        "Consideramos importante que est\u00E9 al tanto de esta situaci\u00F3n para que pueda tomar las medidas necesarias para ofrecerle apoyo y asistencia.\n\n" +
                        "Atentamente,\n" +
                        "El equipo de Take My Hand.")];
            case 10:
                // 8. Enviar un correo al profesional asignado
                _b.sent();
                _b.label = 11;
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.verificarEstadoAnimo = verificarEstadoAnimo;
//# sourceMappingURL=pacientes.service.js.map