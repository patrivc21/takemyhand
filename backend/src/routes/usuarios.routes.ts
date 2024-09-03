import express from 'express';
import usuariosController from '../controllers/usuarios.controller';
import { AuthGuard } from '../guards/auth.guard';
import { UserValidator, UserLoginValidator } from '../validators/users.validators';

const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: "assets/" });

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: 'assets' })

router.post('/addUser', [usuariosController.addNewUser]);
router.get('/getOneUser', AuthGuard,  [usuariosController.getOneUserController]);
router.get('/getAllUsers', AuthGuard, [usuariosController.getAllUsersControllers]);
router.get('/getAllRoles', [usuariosController.getAllRolesC]);
router.put('/updateUsuario', AuthGuard,  [usuariosController.updateUsuarios]);
router.post('/login', [UserLoginValidator, usuariosController.login]);
router.post('/register', [ UserValidator, usuariosController.register]); //AuthGuard,
router.post('/getUserByEmail', AuthGuard,  [usuariosController.getUserByEmailC]);
router.post('/getAllUsersExceptMe', AuthGuard,  [usuariosController.getAllUsersExceptMeC]);

router.post('/addPublicacion', AuthGuard, multipartMiddleware, [usuariosController.addPublicacionC]);
router.post('/getOnePubli', AuthGuard, [usuariosController.getOnePublicacionController]);
router.get('/getAllPublis', AuthGuard, [usuariosController.getAllPublicacionesControllers]);
router.post('/deletePubli', AuthGuard, [usuariosController.deletePublicaciones]);
router.post('/buscar', AuthGuard, [usuariosController.buscarC]);
router.post('/getPublisUser', AuthGuard,  [usuariosController.getAllPublisUser]);
router.post('/updatePubli', AuthGuard, [usuariosController.updatePublicaciones]);


router.post('/addRespuesta', AuthGuard, multipartMiddleware, [usuariosController.addRespuesta]);
router.post('/getRespuestas', AuthGuard, [usuariosController.getRespuestasC]);

export default router;