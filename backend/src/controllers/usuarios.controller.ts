import { Request, Response } from 'express';
import RespGeneric from '../models/RespGeneric';
import { Usuarios } from '../entities/Usuarios';
import { addUsuarios, getAllUsers, getOneUser, getUserByEmail, getAllRoles, updateUsuariosService, getAllUsersExceptMe} from '../services/usuarios.service';
import authHelper from '../helpers/auth.helper';
import { sendLoginEmail } from '../helpers/mail.helper';

import { addPaciente, updatePacientesService} from '../services/pacientes.service';
import { addProfesional, updateProfesionalesService} from '../services/profesional.service';
import { addAdmin} from '../services/administradores.service';

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
        resp.data = {users};
        resp.cod = 200;
    } catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp); 
}

const register = async (req: Request, res: Response) => {
    let resp = new RespGeneric();
    let user = req.body;

    try {
        console.log(user)
        let exist_user = await getUserByEmail(user.email);

        if (exist_user) {
            resp.msg = "User already exists";
            resp.cod = 400;
            res.json(resp);
            return
        }

        let token = authHelper.generateToken(user);
        let original_password = user.password;
        let hash = await authHelper.hashPassword(user.password);
        user.password = hash;
        let result = await addUsuarios(user);
        console.log(result)

        if(user.rol == 1){
            await addAdmin({ ...user, id_usuario: result.id })
        }else if(user.rol == 2){
            await addPaciente({ ...user, id_usuario: result.id })
        }else if(user.rol == 3){
            await addProfesional({ ...user, id_usuario: result.id })
        }

        resp.data = { user: { ...user, password: '' }, token };
        resp.cod = result ? 200 : 400;

        if (result) {
            let email = await sendLoginEmail({ ...user, password: original_password });
            if (!email) {
                resp.msg = "Error al enviar el email de registro.";
                resp.cod = 500;
            }
        }

    } catch (e) {
        console.error(e);
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp); // Devolvemos objeto respuesta siempre
}

const login = async (req: Request, res: Response) => {
    let resp = new RespGeneric();
    let { email, password } = req.body;
    console.log('aqui', req.headers['authorization'])
    try {
        let user = await getUserByEmail(email);
        if (!user) {
            resp.msg = "Usuario no encontrado.";
            resp.cod = 204;
        } else {
            let valid = await authHelper.validatePassword(password, user.password);

            if (!valid) {
                resp.msg = "Contraseña incorrecta.";
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
    res.json(resp);
}

export const getAllRolesC = async (_req: Request, res: Response) => {
    try {
        const roles = await getAllRoles();
        res.status(200).json({
            message: "Roles obtenidos con éxito",
            data: roles,
        });
    } catch (e) {
        console.error('Error al obtener los roles:', e);
        res.status(500).json({
            message: "Error al obtener los roles",
            error: e instanceof Error ? e.message : String(e),
        });
    }
};

export const updateUsuarios = async (req: Request, res: Response) => {
    let resp = new RespGeneric();
    try {
        let user = req.body;
        console.log('user', user)
        let result = await updateUsuariosService(user);
        
        if(user.rol == 1){
            // await (user)
        }else if(user.rol == 2){
            await updatePacientesService(user)
        }else if(user.rol == 3){
            await updateProfesionalesService(user)
        }

        resp.cod = result ? 200 : 400;
        resp.data = {user: result};
    }
    catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
        resp.data = {e};
    }
    res.json(resp)
}

export const getUserByEmailC = async (req:Request, res:Response) => {
    let resp = new RespGeneric();
    try {
        let body = req.body;
        console.log(body)
        let user = await getUserByEmail(body.email);
        console.log(user)
        resp.data = {user: user};
        resp.cod = 200;
    } catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp);
}

export const getAllUsersExceptMeC = async (req: Request, res: Response) => {
    let resp = new RespGeneric();
    try {
        
        const id = req.body.id; 
        let users = await getAllUsersExceptMe(id);
        resp.data = { users };
        resp.cod = 200;
    } catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp);
}


export default { addNewUser, getAllUsersControllers, getOneUserController, login, register, getAllRolesC, updateUsuarios, getUserByEmailC, getAllUsersExceptMeC};