import express from 'express';
import usuariosController from '../controllers/usuarios.controller';
// import { AuthGuard } from '../guards/auth.guard';

const router = express.Router();

router.post('/addUser', [usuariosController.addNewUser]);
router.get('/getOneUser', [usuariosController.getOneUser]);
router.get('/getAllUsers', [usuariosController.getAllUsers]);

export default router;