"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var usuarios_controller_1 = __importDefault(require("../controllers/usuarios.controller"));
// import { AuthGuard } from '../guards/auth.guard';
var router = express_1.default.Router();
router.post('/addUser', [usuarios_controller_1.default.addNewUser]);
router.get('/getOneUser', [usuarios_controller_1.default.getOneUser]);
router.get('/getAllUsers', [usuarios_controller_1.default.getAllUsers]);
exports.default = router;
//# sourceMappingURL=usuarios.routes.js.map