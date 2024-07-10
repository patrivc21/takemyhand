"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cuestionarios_controller_1 = __importDefault(require("../controllers/cuestionarios.controller"));
var auth_guard_1 = require("../guards/auth.guard");
var router = express_1.default.Router();
router.post('/cuestionarioDepresion', auth_guard_1.AuthGuard, [cuestionarios_controller_1.default.cuestionarioProbabilidadEnDepresion]);
router.post('/cuestionarioPlutchik', auth_guard_1.AuthGuard, [cuestionarios_controller_1.default.cuestionarioPlutchik]);
exports.default = router;
//# sourceMappingURL=cuestionarios.routes.js.map