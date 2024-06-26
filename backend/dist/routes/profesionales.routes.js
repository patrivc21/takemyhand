"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var profesional_controller_1 = __importDefault(require("../controllers/profesional.controller"));
var router = express_1.default.Router();
router.post('/addProfesional', [profesional_controller_1.default.addNewProfesional]);
router.get('/getOneProfesional', [profesional_controller_1.default.getOneProfesionalController]);
router.get('/getAllProfesionales', [profesional_controller_1.default.getAllProfesionalesControllers]);
router.put('/updateProfesional', [profesional_controller_1.default.updateProfesional]);
router.post('/deleteProfesionales', [profesional_controller_1.default.deleteProfesionalesController]);
exports.default = router;
//# sourceMappingURL=profesionales.routes.js.map