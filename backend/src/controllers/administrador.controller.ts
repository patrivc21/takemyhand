import { Request, Response } from 'express';
import RespGeneric from '../models/RespGeneric';
import { Administradores } from '../entities/Administrador';
import { addAdmin, getAllAdmins, getOneAdmin} from '../services/administradores.service'

export const addNewAdmin = async (req: Request, res: Response) => {
    let resp = new RespGeneric();
    try {
        let admin : Administradores = req.body as Administradores;
        let result = await addAdmin(admin);
        resp.msg = "Admin anadido con exito";
        resp.cod = result ? 200 : 400;
    }
    catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp); 
}

export const getOneAdminController = async (req:Request, res:Response) => {
    let resp = new RespGeneric();
    try {
        let body = req.body;
        let result = await getOneAdmin(body.id);
        resp.data = {result: result};
        resp.cod = 200;
    } catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp);
}


export const getAllAdministradoresControllers = async (_req:Request, res:Response) => {
    let resp = new RespGeneric();
    try {
        let result = await getAllAdmins();
        resp.data = {result: result};
        resp.cod = 200;
    } catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp); 
}

export default { addNewAdmin, getOneAdminController, getAllAdministradoresControllers};