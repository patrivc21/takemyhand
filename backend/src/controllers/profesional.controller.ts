import { Request, Response } from 'express';
import RespGeneric from '../models/RespGeneric';
import { Profesionales } from '../entities/Profesional';
import { addProfesional, getAllProfesionales, getOneProfesional, updateProfesionalesService, deleteProfesionalesService} from '../services/profesional.service'

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


export const updateProfesional = async (req: Request, res: Response) => {
    let resp = new RespGeneric();
    try {
        let prof : Profesionales = req.body as Profesionales;
        let result = await updateProfesionalesService(prof);
        resp.cod = result ? 200 : 400;
        resp.data = {profesionales: result};
    }
    catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp)
}


export const deleteProfesionalesController = async (req: Request, res: Response) => {
    let resp = new RespGeneric();
    try {
        const ids: number[] = req.body.ids;

        if (!ids || !Array.isArray(ids)) {
            return res.status(400).json({ message: 'Invalid request. Please provide an array of IDs.' });
        }

        let result = await deleteProfesionalesService(ids);
        resp.cod = result ? 200 : 400;
        resp.data = {result};
        resp.msg = "Profesionales eliminados con exito."

    } catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
        resp.msg = "Error al eliminar profesionales"
    }
};

export default { addNewProfesional, getOneProfesionalController, getAllProfesionalesControllers, updateProfesional, deleteProfesionalesController};