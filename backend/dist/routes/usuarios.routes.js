"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var usuarios_controller_1 = __importDefault(require("../controllers/usuarios.controller"));
var auth_guard_1 = require("../guards/auth.guard");
var users_validators_1 = require("../validators/users.validators");
var router = express_1.default.Router();
var multer = require('multer');
var upload = multer({ dest: "assets/" });
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: 'assets' });
router.post('/addUser', [usuarios_controller_1.default.addNewUser]);
router.get('/getOneUser', auth_guard_1.AuthGuard, [usuarios_controller_1.default.getOneUserController]);
router.get('/getAllUsers', auth_guard_1.AuthGuard, [usuarios_controller_1.default.getAllUsersControllers]);
router.get('/getAllRoles', [usuarios_controller_1.default.getAllRolesC]);
router.put('/updateUsuario', auth_guard_1.AuthGuard, [usuarios_controller_1.default.updateUsuarios]);
router.post('/login', [users_validators_1.UserLoginValidator, usuarios_controller_1.default.login]);
router.post('/register', [users_validators_1.UserValidator, usuarios_controller_1.default.register]); //AuthGuard,
router.post('/getUserByEmail', auth_guard_1.AuthGuard, [usuarios_controller_1.default.getUserByEmailC]);
router.post('/getAllUsersExceptMe', auth_guard_1.AuthGuard, [usuarios_controller_1.default.getAllUsersExceptMeC]);
router.post('/addPublicacion', auth_guard_1.AuthGuard, multipartMiddleware, [usuarios_controller_1.default.addPublicacionC]);
router.post('/getOnePubli', auth_guard_1.AuthGuard, [usuarios_controller_1.default.getOnePublicacionController]);
router.get('/getAllPublis', auth_guard_1.AuthGuard, [usuarios_controller_1.default.getAllPublicacionesControllers]);
router.post('/deletePubli', auth_guard_1.AuthGuard, [usuarios_controller_1.default.deletePublicacionesController]);
router.post('/buscar', auth_guard_1.AuthGuard, [usuarios_controller_1.default.buscarC]);
router.post('/addRespuesta', multipartMiddleware, [usuarios_controller_1.default.addRespuesta]);
router.post('/getRespuestas', [usuarios_controller_1.default.getRespuestasC]);
exports.default = router;
//# sourceMappingURL=usuarios.routes.js.map