import { Request, Response } from 'express';
import RespGeneric from '../models/RespGeneric';
import { Usuarios } from '../entities/Usuarios';
import { addUsuarios, getAllUsers, getOneUser} from '../services/usuarios.service';

export const addNewUser = async (req: Request, res: Response) => {
    let resp = new RespGeneric();
    try {
        let user : Usuarios = req.body as Usuarios;
        console.log(user)
        let result = await addUsuarios(user);
        resp.cod = result ? 200 : 400;
    }
    catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp);  // Devolvemos objeto respuesta siempre
}

export const getOneUserController = async (req:Request, res:Response) => {
    let resp = new RespGeneric();
    try {
        const iduser = req.body.id;
        let user = await getOneUser(iduser);
        resp.data = {user: user};
        resp.cod = 200;
    } catch (e) {
        console.log(e);
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp);
}


export const getAllUsersController = async (req: Request, res: Response) => {
    let resp = new RespGeneric();
    try {
        let result = await getAllUsers();
        resp.cod = result ? 200 : 400;
    }
    catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp);  // Devolvemos objeto respuesta siempre
}

export default { addNewUser, getAllUsers, getOneUser};