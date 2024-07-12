import { Request, Response } from 'express';
import RespGeneric from '../models/RespGeneric';
import { addPlanSeguridad, getOnePlan, addArchivo} from '../services/planseguridad.service'
import { PlanSeguridad } from '../entities/PlanSeguridad';
const fs = require('fs');


export const addPlanSeguridadC = async (req: Request, res: Response) => {
    let resp = new RespGeneric();
    let infor = req.body
    const nombre_archivo = (req as any).files;
    try {
        let datos = {infor, nombre_archivo}
        console.log(datos)
        
        let planGuardado = await addPlanSeguridad(infor);
        let saveFiles = true;
        
        if (nombre_archivo && planGuardado) {
            saveFiles = await addArchivo(nombre_archivo, planGuardado.id, planGuardado.id_usuario);
        }
        resp.data = { saveFiles: saveFiles };
        resp.cod = 200;
    } catch (error) {
        console.log(error as string);
        resp.msg = error as string;
        resp.cod = 500;
    }
    return res.json(resp);
}

export const getOpnePlanC = async (req:Request, res:Response) => {
    let resp = new RespGeneric();
    try {
        let body = req.body;
        let plan = await getOnePlan(body.id_usuario);
        resp.data = {plan: plan};
        resp.cod = 200;
    } catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp);
}

export default { addPlanSeguridadC, getOpnePlanC };