import express from 'express';
import usuariosController from '../controllers/usuarios.controller';
import { AuthGuard } from '../guards/auth.guard';
import { UserValidator, UserLoginValidator } from '../validators/users.validators';

const router = express.Router();

router.post('/addUser', [usuariosController.addNewUser]);
router.get('/getOneUser', [usuariosController.getOneUserController]);
router.get('/getAllUsers', [usuariosController.getAllUsersControllers]);
router.get('/getAllRoles', [usuariosController.getAllRolesC]);

router.post('/login', [UserLoginValidator, usuariosController.login]);
router.post('/register', [ UserValidator, usuariosController.register]); //AuthGuard,

export default router;