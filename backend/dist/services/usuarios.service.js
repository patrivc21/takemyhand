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
exports.getAllUsersExceptMe = exports.updateUsuariosService = exports.getAllRoles = exports.getUserByEmail = exports.getAllUsers = exports.getOneUser = exports.addUsuarios = void 0;
var Usuarios_1 = require("../entities/Usuarios");
var typeorm_1 = require("../config/typeorm");
var typeorm_2 = require("typeorm");
var RolUsuarios_1 = require("../entities/RolUsuarios");
var addUsuarios = function (usuarios) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.DB.getRepository(Usuarios_1.Usuarios).save(usuarios)];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res];
        }
    });
}); };
exports.addUsuarios = addUsuarios;
var getOneUser = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.DB.getRepository(Usuarios_1.Usuarios).findOne({
                    where: [
                        { id: id }
                    ]
                })];
            case 1:
                user = _a.sent();
                return [2 /*return*/, user];
        }
    });
}); };
exports.getOneUser = getOneUser;
var getAllUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.DB.getRepository(Usuarios_1.Usuarios).find()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, users];
        }
    });
}); };
exports.getAllUsers = getAllUsers;
var getUserByEmail = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.DB.getRepository(Usuarios_1.Usuarios).findOne({
                    where: [
                        { email: email }
                    ]
                })];
            case 1:
                user = _a.sent();
                return [2 /*return*/, user];
        }
    });
}); };
exports.getUserByEmail = getUserByEmail;
var getAllRoles = function () { return __awaiter(void 0, void 0, void 0, function () {
    var roles;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.DB.getRepository(RolUsuarios_1.RolUsuarios).find()];
            case 1:
                roles = _a.sent();
                return [2 /*return*/, roles];
        }
    });
}); };
exports.getAllRoles = getAllRoles;
var updateUsuariosService = function (usuario) { return __awaiter(void 0, void 0, void 0, function () {
    var userToUpdate, resp;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.DB.getRepository(Usuarios_1.Usuarios).findOneBy({ email: usuario.email })];
            case 1:
                userToUpdate = _a.sent();
                resp = null;
                if (!userToUpdate) return [3 /*break*/, 3];
                Object.assign(userToUpdate, usuario);
                return [4 /*yield*/, typeorm_1.DB.getRepository(Usuarios_1.Usuarios).save(userToUpdate)];
            case 2:
                resp = _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/, resp != null];
        }
    });
}); };
exports.updateUsuariosService = updateUsuariosService;
var getAllUsersExceptMe = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.DB.getRepository(Usuarios_1.Usuarios).find({
                    where: {
                        id: (0, typeorm_2.Not)(id)
                    }
                })];
            case 1:
                users = _a.sent();
                return [2 /*return*/, users];
        }
    });
}); };
exports.getAllUsersExceptMe = getAllUsersExceptMe;
//# sourceMappingURL=usuarios.service.js.map