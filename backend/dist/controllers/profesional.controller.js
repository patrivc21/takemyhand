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
exports.addPublicacionC = exports.deleteProfesionalesController = exports.updateProfesional = exports.getAllProfesionalesControllers = exports.getOneProfesionalController = exports.addNewProfesional = void 0;
var RespGeneric_1 = __importDefault(require("../models/RespGeneric"));
var profesional_service_1 = require("../services/profesional.service");
var addNewProfesional = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, profesional, result, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                resp = new RespGeneric_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                profesional = req.body;
                return [4 /*yield*/, (0, profesional_service_1.addProfesional)(profesional)];
            case 2:
                result = _a.sent();
                resp.msg = "Profesional anadido con exito";
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
exports.addNewProfesional = addNewProfesional;
var getOneProfesionalController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, body, result, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                resp = new RespGeneric_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                body = req.body;
                return [4 /*yield*/, (0, profesional_service_1.getOneProfesional)(body.id)];
            case 2:
                result = _a.sent();
                if (result)
                    result.password = '';
                resp.data = { result: result };
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
exports.getOneProfesionalController = getOneProfesionalController;
var getAllProfesionalesControllers = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, result, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                resp = new RespGeneric_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, profesional_service_1.getAllProfesionales)()];
            case 2:
                result = _a.sent();
                if (result) {
                    result.forEach(function (profesional) {
                        profesional.password = '';
                    });
                }
                resp.data = { result: result };
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
exports.getAllProfesionalesControllers = getAllProfesionalesControllers;
var updateProfesional = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, prof, result, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                resp = new RespGeneric_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                prof = req.body;
                return [4 /*yield*/, (0, profesional_service_1.updateProfesionalesService)(prof)];
            case 2:
                result = _a.sent();
                resp.cod = result ? 200 : 400;
                resp.data = { profesionales: result };
                return [3 /*break*/, 4];
            case 3:
                e_4 = _a.sent();
                resp.msg = e_4;
                resp.cod = 500;
                return [3 /*break*/, 4];
            case 4:
                res.json(resp);
                return [2 /*return*/];
        }
    });
}); };
exports.updateProfesional = updateProfesional;
var deleteProfesionalesController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, ids, result, e_5;
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
                return [4 /*yield*/, (0, profesional_service_1.deleteProfesionalesService)(ids)];
            case 2:
                result = _a.sent();
                resp.cod = result ? 200 : 400;
                resp.data = { result: result };
                resp.msg = "Profesionales eliminados con exito.";
                return [3 /*break*/, 4];
            case 3:
                e_5 = _a.sent();
                resp.msg = e_5;
                resp.cod = 500;
                resp.msg = "Error al eliminar profesionales";
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteProfesionalesController = deleteProfesionalesController;
var addPublicacionC = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, infor, nombre_archivo, datos, publi, saveFiles, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                resp = new RespGeneric_1.default();
                infor = req.body;
                nombre_archivo = req.files;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                datos = { infor: infor, nombre_archivo: nombre_archivo };
                console.log(datos);
                return [4 /*yield*/, (0, profesional_service_1.addPublicacion)(infor, nombre_archivo)];
            case 2:
                publi = _a.sent();
                saveFiles = true;
                if (!nombre_archivo) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, profesional_service_1.addArchivoPublicacion)(nombre_archivo, publi.id)];
            case 3:
                saveFiles = _a.sent();
                _a.label = 4;
            case 4:
                resp.data = { saveFiles: saveFiles };
                resp.cod = 200;
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                console.log(error_1);
                resp.msg = error_1;
                resp.cod = 500;
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/, res.json(resp)];
        }
    });
}); };
exports.addPublicacionC = addPublicacionC;
exports.default = { addNewProfesional: exports.addNewProfesional, getOneProfesionalController: exports.getOneProfesionalController, getAllProfesionalesControllers: exports.getAllProfesionalesControllers, updateProfesional: exports.updateProfesional, deleteProfesionalesController: exports.deleteProfesionalesController, addPublicacionC: exports.addPublicacionC };
//# sourceMappingURL=profesional.controller.js.map