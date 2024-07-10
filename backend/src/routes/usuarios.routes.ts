import express from 'express';
import usuariosController from '../controllers/usuarios.controller';
import { AuthGuard } from '../guards/auth.guard';
import { UserValidator, UserLoginValidator } from '../validators/users.validators';

const router = express.Router();

router.post('/addUser', [usuariosController.addNewUser]);
router.get('/getOneUser', AuthGuard,  [usuariosController.getOneUserController]);
router.get('/getAllUsers', AuthGuard, [usuariosController.getAllUsersControllers]);
router.get('/getAllRoles', AuthGuard,  [usuariosController.getAllRolesC]);
router.put('/updateUsuario', AuthGuard,  [usuariosController.updateUsuarios]);
router.post('/login', [UserLoginValidator, usuariosController.login]);
router.post('/register', [ UserValidator, usuariosController.register]); //AuthGuard,
router.post('/getUserByEmail', AuthGuard,  [usuariosController.getUserByEmailC]);
router.post('/getAllUsersExceptMe', AuthGuard,  [usuariosController.getAllUsersExceptMeC]);

export default router;