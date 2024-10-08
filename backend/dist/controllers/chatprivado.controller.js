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
exports.pruebaC = exports.buscadorC = exports.getOneChatPrivado = exports.addChatPrivado = void 0;
var RespGeneric_1 = __importDefault(require("../models/RespGeneric"));
var chatprivado_service_1 = require("../services/chatprivado.service");
var addChatPrivado = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, chat, result, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                resp = new RespGeneric_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                chat = req.body;
                return [4 /*yield*/, (0, chatprivado_service_1.addChat)(chat)];
            case 2:
                result = _a.sent();
                resp.msg = "Evento anadido con exito";
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
exports.addChatPrivado = addChatPrivado;
var getOneChatPrivado = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, body, result, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                resp = new RespGeneric_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                body = req.body;
                return [4 /*yield*/, (0, chatprivado_service_1.getOneChat)(body.id_emisor, body.id_receptor)];
            case 2:
                result = _a.sent();
                resp.data = result;
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
exports.getOneChatPrivado = getOneChatPrivado;
var buscadorC = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, body, result, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                resp = new RespGeneric_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                body = req.body;
                return [4 /*yield*/, (0, chatprivado_service_1.buscadorUsuarios)(body.texto)];
            case 2:
                result = _a.sent();
                resp.data = result;
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
exports.buscadorC = buscadorC;
var pruebaC = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resp, texto, datos, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                resp = new RespGeneric_1.default();
                texto = req.body.texto;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, chatprivado_service_1.prueba)(texto)];
            case 2:
                datos = _a.sent();
                resp.data = { datos: datos };
                resp.cod = 200;
                res.json(resp);
                return [3 /*break*/, 4];
            case 3:
                e_4 = _a.sent();
                resp.msg = e_4;
                resp.cod = 500;
                res.json(resp);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.pruebaC = pruebaC;
exports.default = { addChatPrivado: exports.addChatPrivado, getOneChatPrivado: exports.getOneChatPrivado, pruebaC: exports.pruebaC, buscadorC: exports.buscadorC };
//# sourceMappingURL=chatprivado.controller.js.map