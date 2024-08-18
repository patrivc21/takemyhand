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
exports.getRespuestas = exports.addArchivoRespuestaPublicacion = exports.addRespuestaPublicacion = exports.buscarPublis = exports.getOnePublicacion = exports.getAllPublicaciones = exports.deletePublicacion = exports.addArchivoPublicacion = exports.addPublicacion = exports.getAllUsersExceptMe = exports.updateUsuariosService = exports.getAllRoles = exports.getUserByEmail = exports.getAllUsers = exports.getOneUser = exports.addUsuarios = void 0;
var Usuarios_1 = require("../entities/Usuarios");
var typeorm_1 = require("../config/typeorm");
var typeorm_2 = require("typeorm");
var RolUsuarios_1 = require("../entities/RolUsuarios");
var HiloUsuarios_1 = require("../entities/HiloUsuarios");
var ArchivosHiloUsuarios_1 = require("../entities/ArchivosHiloUsuarios");
var path_1 = __importDefault(require("path"));
var RespuestaUsuarios_1 = require("../entities/RespuestaUsuarios");
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
var addPublicacion = function (publicacion) { return __awaiter(void 0, void 0, void 0, function () {
    var datos, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                datos = {
                    fecha_hora: new Date(),
                    titulo: publicacion.titulo,
                    mensaje: publicacion.mensaje,
                    id_usuario: publicacion.id_usuario,
                    archivo_adjunto: ''
                };
                console.log('datos1', datos);
                return [4 /*yield*/, typeorm_1.DB.getRepository(HiloUsuarios_1.HiloUsuarios).save(datos)];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res];
        }
    });
}); };
exports.addPublicacion = addPublicacion;
var addArchivoPublicacion = function (plan, id) { return __awaiter(void 0, void 0, void 0, function () {
    var filesSaved, _a, _b, _c, _i, key, file, archivo_com;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = plan;
                _b = [];
                for (_c in _a)
                    _b.push(_c);
                _i = 0;
                _d.label = 1;
            case 1:
                if (!(_i < _b.length)) return [3 /*break*/, 4];
                _c = _b[_i];
                if (!(_c in _a)) return [3 /*break*/, 3];
                key = _c;
                if (!plan.hasOwnProperty(key)) return [3 /*break*/, 3];
                file = plan[key];
                archivo_com = {
                    id_hilo: id,
                    archivo_adjunto: file ? path_1.default.basename(file.path) : '',
                };
                return [4 /*yield*/, typeorm_1.DB.getRepository(ArchivosHiloUsuarios_1.ArchivosHiloUsuario).save(archivo_com)];
            case 2:
                filesSaved = _d.sent();
                _d.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, filesSaved != null];
        }
    });
}); };
exports.addArchivoPublicacion = addArchivoPublicacion;
var deletePublicacion = function (ids) { return __awaiter(void 0, void 0, void 0, function () {
    var deleteResult, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, typeorm_1.DB.getRepository(HiloUsuarios_1.HiloUsuarios).delete(ids)];
            case 1:
                deleteResult = _a.sent();
                return [2 /*return*/, deleteResult.affected != null];
            case 2:
                error_1 = _a.sent();
                console.error('Error al borrar las publicaciones:', error_1);
                return [2 /*return*/, false];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deletePublicacion = deletePublicacion;
var getAllPublicaciones = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.DB.getRepository(HiloUsuarios_1.HiloUsuarios)
                    .createQueryBuilder('h')
                    .leftJoinAndSelect('h.usuario', 'p')
                    .leftJoinAndSelect('h.archivos', 'a')
                    .orderBy('h.fecha_hora', 'DESC')
                    .getMany()];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res];
        }
    });
}); };
exports.getAllPublicaciones = getAllPublicaciones;
var getOnePublicacion = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.DB.getRepository(HiloUsuarios_1.HiloUsuarios)
                    .createQueryBuilder('h')
                    .leftJoinAndSelect('h.usuario', 'p')
                    .leftJoinAndSelect('h.archivos', 'a')
                    .where('h.id = :id', { id: id })
                    .getMany()];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res];
        }
    });
}); };
exports.getOnePublicacion = getOnePublicacion;
var buscarPublis = function (fechaInicio, fechaFin) { return __awaiter(void 0, void 0, void 0, function () {
    var query, adjustedFechaFin, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.DB.getRepository(HiloUsuarios_1.HiloUsuarios)
                    .createQueryBuilder('h')
                    .leftJoinAndSelect('h.usuario', 'p')
                    .leftJoinAndSelect('h.archivos', 'a')];
            case 1:
                query = _a.sent();
                if (fechaInicio) {
                    query.andWhere('h.fecha_hora >= :fechaInicio', { fechaInicio: fechaInicio });
                }
                if (fechaFin) {
                    adjustedFechaFin = new Date(fechaFin);
                    adjustedFechaFin.setHours(23, 59, 59, 999);
                    query.andWhere('h.fecha_hora <= :fechaFin', { fechaFin: adjustedFechaFin.toISOString() });
                }
                query.orderBy('h.fecha_hora', 'DESC');
                return [4 /*yield*/, query.getMany()];
            case 2:
                res = _a.sent();
                return [2 /*return*/, res];
        }
    });
}); };
exports.buscarPublis = buscarPublis;
var addRespuestaPublicacion = function (publicacion) { return __awaiter(void 0, void 0, void 0, function () {
    var datos, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                datos = {
                    fecha_hora: new Date(),
                    titulo: publicacion.titulo,
                    mensaje: publicacion.mensaje,
                    id_usuario: publicacion.id_usuario,
                    archivo_adjunto: '',
                    id_hilo: publicacion.id_hilo
                };
                return [4 /*yield*/, typeorm_1.DB.getRepository(RespuestaUsuarios_1.RespuestaHiloUsuarios).save(datos)];
            case 1:
                res = _a.sent();
                console.log(res);
                return [2 /*return*/, res];
        }
    });
}); };
exports.addRespuestaPublicacion = addRespuestaPublicacion;
var addArchivoRespuestaPublicacion = function (plan, id, id_resp) { return __awaiter(void 0, void 0, void 0, function () {
    var filesSaved, _a, _b, _c, _i, key, file, archivo_com;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = plan;
                _b = [];
                for (_c in _a)
                    _b.push(_c);
                _i = 0;
                _d.label = 1;
            case 1:
                if (!(_i < _b.length)) return [3 /*break*/, 4];
                _c = _b[_i];
                if (!(_c in _a)) return [3 /*break*/, 3];
                key = _c;
                if (!plan.hasOwnProperty(key)) return [3 /*break*/, 3];
                file = plan[key];
                archivo_com = {
                    id_hilo: id,
                    id_respuesta: id_resp,
                    archivo_adjunto: file ? path_1.default.basename(file.path) : '',
                };
                return [4 /*yield*/, typeorm_1.DB.getRepository(ArchivosHiloUsuarios_1.ArchivosHiloUsuario).save(archivo_com)];
            case 2:
                filesSaved = _d.sent();
                _d.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, filesSaved != null];
        }
    });
}); };
exports.addArchivoRespuestaPublicacion = addArchivoRespuestaPublicacion;
var getRespuestas = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var respuestas;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.DB.getRepository(RespuestaUsuarios_1.RespuestaHiloUsuarios)
                    .createQueryBuilder('rp')
                    .leftJoinAndSelect('rp.usuario', 'p')
                    .leftJoinAndSelect('rp.archivos', 'a')
                    .where('rp.id_hilo = :id', { id: id })
                    .orderBy('rp.fecha_hora', 'DESC')
                    .getMany()];
            case 1:
                respuestas = _a.sent();
                return [2 /*return*/, respuestas];
        }
    });
}); };
exports.getRespuestas = getRespuestas;
//# sourceMappingURL=usuarios.service.js.map