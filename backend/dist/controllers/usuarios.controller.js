"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.getAllUsersExceptMeC = exports.getUserByEmailC = exports.updateUsuarios = exports.getAllRolesC = exports.getAllUsersControllers = exports.getOneUserController = exports.addNewUser = void 0;
var RespGeneric_1 = __importDefault(require("../models/RespGeneric"));
var usuarios_service_1 = require("../services/usuarios.service");
var auth_helper_1 = __importDefault(require("../helpers/auth.helper"));
var mail_helper_1 = require("../helpers/mail.helper");
var pacientes_service_1 = require("../services/pacientes.service");
var profesional_service_1 = require("../services/profesional.service");
var administradores_service_1 = require("../services/administradores.service");
var addNewUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, user, result, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                resp = new RespGeneric_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                user = req.body;
                console.log(user);
                return [4 /*yield*/, (0, usuarios_service_1.addUsuarios)(user)];
            case 2:
                result = _a.sent();
                resp.msg = "Usuario anadido con exito";
                resp.cod = result ? 200 : 400;
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                resp.msg = e_1;
                resp.cod = 500;
                return [3 /*break*/, 4];
            case 4:
                res.json(resp); // Devolvemos objeto respuesta siempre
                return [2 /*return*/];
        }
    });
}); };
exports.addNewUser = addNewUser;
var getOneUserController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, body, user, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                resp = new RespGeneric_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                body = req.body;
                return [4 /*yield*/, (0, usuarios_service_1.getOneUser)(body.id)];
            case 2:
                user = _a.sent();
                resp.data = { user: user };
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
exports.getOneUserController = getOneUserController;
var getAllUsersControllers = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, users, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                resp = new RespGeneric_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, usuarios_service_1.getAllUsers)()];
            case 2:
                users = _a.sent();
                resp.data = { users: users };
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
exports.getAllUsersControllers = getAllUsersControllers;
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, user, exist_user, token, original_password, hash, result, email, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                resp = new RespGeneric_1.default();
                user = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 13, , 14]);
                console.log(user);
                return [4 /*yield*/, (0, usuarios_service_1.getUserByEmail)(user.email)];
            case 2:
                exist_user = _a.sent();
                if (exist_user) {
                    resp.msg = "User already exists";
                    resp.cod = 400;
                    res.json(resp);
                    return [2 /*return*/];
                }
                token = auth_helper_1.default.generateToken(user);
                original_password = user.password;
                return [4 /*yield*/, auth_helper_1.default.hashPassword(user.password)];
            case 3:
                hash = _a.sent();
                user.password = hash;
                return [4 /*yield*/, (0, usuarios_service_1.addUsuarios)(user)];
            case 4:
                result = _a.sent();
                console.log(result);
                if (!(user.rol == 1)) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, administradores_service_1.addAdmin)(__assign(__assign({}, user), { id_usuario: result.id }))];
            case 5:
                _a.sent();
                return [3 /*break*/, 10];
            case 6:
                if (!(user.rol == 2)) return [3 /*break*/, 8];
                return [4 /*yield*/, (0, pacientes_service_1.addPaciente)(__assign(__assign({}, user), { id_usuario: result.id }))];
            case 7:
                _a.sent();
                return [3 /*break*/, 10];
            case 8:
                if (!(user.rol == 3)) return [3 /*break*/, 10];
                return [4 /*yield*/, (0, profesional_service_1.addProfesional)(__assign(__assign({}, user), { id_usuario: result.id }))];
            case 9:
                _a.sent();
                _a.label = 10;
            case 10:
                resp.data = { user: __assign(__assign({}, user), { password: '' }), token: token };
                resp.cod = result ? 200 : 400;
                if (!result) return [3 /*break*/, 12];
                return [4 /*yield*/, (0, mail_helper_1.sendLoginEmail)(__assign(__assign({}, user), { password: original_password }))];
            case 11:
                email = _a.sent();
                if (!email) {
                    resp.msg = "Error al enviar el email de registro.";
                    resp.cod = 500;
                }
                _a.label = 12;
            case 12: return [3 /*break*/, 14];
            case 13:
                e_4 = _a.sent();
                console.error(e_4);
                resp.msg = e_4;
                resp.cod = 500;
                return [3 /*break*/, 14];
            case 14:
                res.json(resp); // Devolvemos objeto respuesta siempre
                return [2 /*return*/];
        }
    });
}); };
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, _a, email, password, user, valid, token, e_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                resp = new RespGeneric_1.default();
                _a = req.body, email = _a.email, password = _a.password;
                console.log('aqui', req.headers['authorization']);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, (0, usuarios_service_1.getUserByEmail)(email)];
            case 2:
                user = _b.sent();
                if (!!user) return [3 /*break*/, 3];
                resp.msg = "Usuario no encontrado.";
                resp.cod = 204;
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, auth_helper_1.default.validatePassword(password, user.password)];
            case 4:
                valid = _b.sent();
                if (!valid) {
                    resp.msg = "Contraseña incorrecta.";
                    resp.cod = 401;
                }
                else {
                    user = __assign(__assign({}, user), { password: '' });
                    token = auth_helper_1.default.generateToken(user);
                    resp.data = { user: user, token: token };
                    resp.cod = 200;
                }
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                e_5 = _b.sent();
                resp.msg = e_5;
                resp.cod = 500;
                return [3 /*break*/, 7];
            case 7:
                res.json(resp);
                return [2 /*return*/];
        }
    });
}); };
var getAllRolesC = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var roles, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, usuarios_service_1.getAllRoles)()];
            case 1:
                roles = _a.sent();
                res.status(200).json({
                    message: "Roles obtenidos con éxito",
                    data: roles,
                });
                return [3 /*break*/, 3];
            case 2:
                e_6 = _a.sent();
                console.error('Error al obtener los roles:', e_6);
                res.status(500).json({
                    message: "Error al obtener los roles",
                    error: e_6 instanceof Error ? e_6.message : String(e_6),
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllRolesC = getAllRolesC;
var updateUsuarios = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, user, result, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                resp = new RespGeneric_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                user = req.body;
                console.log('user', user);
                return [4 /*yield*/, (0, usuarios_service_1.updateUsuariosService)(user)];
            case 2:
                result = _a.sent();
                if (!(user.rol == 1)) return [3 /*break*/, 3];
                return [3 /*break*/, 7];
            case 3:
                if (!(user.rol == 2)) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, pacientes_service_1.updatePacientesService)(user)];
            case 4:
                _a.sent();
                return [3 /*break*/, 7];
            case 5:
                if (!(user.rol == 3)) return [3 /*break*/, 7];
                return [4 /*yield*/, (0, profesional_service_1.updateProfesionalesService)(user)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7:
                resp.cod = result ? 200 : 400;
                resp.data = { user: result };
                return [3 /*break*/, 9];
            case 8:
                e_7 = _a.sent();
                resp.msg = e_7;
                resp.cod = 500;
                resp.data = { e: e_7 };
                return [3 /*break*/, 9];
            case 9:
                res.json(resp);
                return [2 /*return*/];
        }
    });
}); };
exports.updateUsuarios = updateUsuarios;
var getUserByEmailC = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, body, user, e_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                resp = new RespGeneric_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                body = req.body;
                console.log(body);
                return [4 /*yield*/, (0, usuarios_service_1.getUserByEmail)(body.email)];
            case 2:
                user = _a.sent();
                console.log(user);
                resp.data = { user: user };
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
exports.getUserByEmailC = getUserByEmailC;
var getAllUsersExceptMeC = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, id, users, e_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                resp = new RespGeneric_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                id = req.body.id;
                return [4 /*yield*/, (0, usuarios_service_1.getAllUsersExceptMe)(id)];
            case 2:
                users = _a.sent();
                resp.data = { users: users };
                resp.cod = 200;
                return [3 /*break*/, 4];
            case 3:
                e_9 = _a.sent();
                resp.msg = e_9;
                resp.cod = 500;
                return [3 /*break*/, 4];
            case 4:
                res.json(resp);
                return [2 /*return*/];
        }
    });
}); };
exports.getAllUsersExceptMeC = getAllUsersExceptMeC;
exports.default = { addNewUser: exports.addNewUser, getAllUsersControllers: exports.getAllUsersControllers, getOneUserController: exports.getOneUserController, login: login, register: register, getAllRolesC: exports.getAllRolesC, updateUsuarios: exports.updateUsuarios, getUserByEmailC: exports.getUserByEmailC, getAllUsersExceptMeC: exports.getAllUsersExceptMeC };
//# sourceMappingURL=usuarios.controller.js.map