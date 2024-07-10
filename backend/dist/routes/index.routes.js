"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var usuarios_routes_1 = __importDefault(require("./usuarios.routes"));
var pacientes_routes_1 = __importDefault(require("./pacientes.routes"));
var profesionales_routes_1 = __importDefault(require("./profesionales.routes"));
var administradores_routes_1 = __importDefault(require("./administradores.routes"));
var cuestionarios_routes_1 = __importDefault(require("./cuestionarios.routes"));
var planseguridad_routes_1 = __importDefault(require("./planseguridad.routes"));
var router = (0, express_1.Router)();
router.use('/usuarios', usuarios_routes_1.default);
router.use('/pacientes', pacientes_routes_1.default);
router.use('/profesionales', profesionales_routes_1.default);
router.use('/administradores', administradores_routes_1.default);
router.use('/cuestionarios', cuestionarios_routes_1.default);
router.use('/plan', planseguridad_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.routes.js.map