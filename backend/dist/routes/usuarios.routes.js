"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var usuarios_controller_1 = __importDefault(require("../controllers/usuarios.controller"));
var users_validators_1 = require("../validators/users.validators");
var router = express_1.default.Router();
router.post('/addUser', [usuarios_controller_1.default.addNewUser]);
router.get('/getOneUser', [usuarios_controller_1.default.getOneUserController]);
router.get('/getAllUsers', [usuarios_controller_1.default.getAllUsersControllers]);
router.get('/getUserByUsername', [usuarios_controller_1.default.getUserByUsernameController]);
router.post('/login', [users_validators_1.UserLoginValidator, usuarios_controller_1.default.login]);
router.post('/register', [users_validators_1.UserValidator, usuarios_controller_1.default.register]);
exports.default = router;
//# sourceMappingURL=usuarios.routes.js.map