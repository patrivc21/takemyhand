import { Request, Response } from 'express';
import RespGeneric from '../models/RespGeneric';
import { Profesionales } from '../entities/Profesional';
import { addProfesional, getAllProfesionales, getOneProfesional} from '../services/profesional.service'

export const addNewProfesional = async (req: Request, res: Response) => {
    let resp = new RespGeneric();
    try {
        let profesional : Profesionales = req.body as Profesionales;
        let result = await addProfesional(profesional);
        resp.msg = "Profesional anadido con exito";
        resp.cod = result ? 200 : 400;
    }
    catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp); 
}

export const getOneProfesionalController = async (req:Request, res:Response) => {
    let resp = new RespGeneric();
    try {
        let body = req.body;
        let result = await getOneProfesional(body.id);
        resp.data = {result: result};
        resp.cod = 200;
    } catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp);
}


export const getAllProfesionalesControllers = async (_req:Request, res:Response) => {
    let resp = new RespGeneric();
    try {
        let result = await getAllProfesionales();
        resp.data = {result: result};
        resp.cod = 200;
    } catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp); 
}

export default { addNewProfesional, getOneProfesionalController, getAllProfesionalesControllers};