import { Request, Response } from 'express';
import RespGeneric from '../models/RespGeneric';
import { Usuarios } from '../entities/Usuarios';
import { addUsuarios, getAllUsers, getOneUser} from '../services/usuarios.service';
import authHelper from '../helpers/auth.helper';

import util from 'util';

export const addNewUser = async (req: Request, res: Response) => {
    let resp = new RespGeneric();
    try {
        let user : Usuarios = req.body as Usuarios;
        console.log(user)
        let result = await addUsuarios(user);
        resp.msg = "Usuario anadido con exito";
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
        let body = req.body;
        let user = await getOneUser(body.id);
        resp.data = {user: user};
        resp.cod = 200;
    } catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp);
}


export const getAllUsersControllers = async (_req:Request, res:Response) => {
    let resp = new RespGeneric();
    try {
        let users = await getAllUsers();
        resp.data = {Usuarios: users};
        resp.cod = 200;
    } catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp); 
}

const register = async (req: Request, res: Response) => {
    let resp = new RespGeneric();
    let user: Usuarios = req.body as Usuarios;
    const user_auth = authHelper.decodeToken(req.headers['authorization']?.replace('Bearer ', '').trim() || '').user;

    try {
        // if (user_auth.idperfil !== 1 && user.iddistribuidor !== user_auth.iddistribuidor) {
        //     resp.msg = "Invalid distributor";
        //     resp.cod = 401;
        //     return res.json(resp);
        // }
        // call the services
        let exist_user = await getOneUser(user.id);

        if (exist_user) {
            resp.msg = "User already exists";
            resp.cod = 400;
            res.json(resp);
            return
        }
        let original_password = user.password;
        let hash = await authHelper.hashPassword(user.password);
        user.password = hash;
        let result = await addUsuarios(user);
        resp.data = { user: { ...user, password: '' } };
        resp.cod = result ? 200 : 400;

        // if (result) {
        //     // send email
        //     let email = await sendLoginEmail({ ...user, password: original_password });
        //     if (!email) {
        //         resp.msg = "Error sending email";
        //         resp.cod = 500;
        //     }
        // }

    } catch (e) {
        console.error(e);
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp); // Devolvemos objeto respuesta siempre
}

const login = async (req: Request, res: Response) => {
    let resp = new RespGeneric();
    let { username, password } = req.body;
    try {
        let user = await getOneUser(username);
        if (!user) {
            resp.msg = "User not found";
            resp.cod = 204;
        } else {
            let valid = await authHelper.validatePassword(password, user.password);

            if (!valid) {
                resp.msg = "Invalid password";
                resp.cod = 401;
            } else {
                user = { ...user, password: '' };
                let token = authHelper.generateToken(user);
                resp.data = { user: user, token: token };
                resp.cod = 200;
            }
        }
    } catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp); // Devolvemos objeto respuesta siempre
}

export default { addNewUser, getAllUsersControllers, getOneUserController, login, register};