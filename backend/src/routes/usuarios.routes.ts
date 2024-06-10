import express from 'express';
import usuariosController from '../controllers/usuarios.controller';
// import { AuthGuard } from '../guards/auth.guard';

const router = express.Router();

router.post('/addUser', [usuariosController.addNewUser]);
router.get('/getOneUser', [usuariosController.getOneUserController]);
router.get('/getAllUsers', [usuariosController.getAllUsersControllers]);

export default router;