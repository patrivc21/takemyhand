import { Request, Response } from 'express';
import RespGeneric from '../models/RespGeneric';
import Cuestionario from '../models/Cuestionario';
import { calcularResultadoRiesgoDespresion, calcularResultadoPlutchik, addPlanSeguridad, getOnePlan} from '../services/cuestionarios.service'
import { PlanSeguridad } from '../entities/PlanSeguridad';
const fs = require('fs');

export const cuestionarioProbabilidadEnDepresion = async (req: Request, res: Response) => {
    let resp = new RespGeneric();
    try {
        let cuestionario : Cuestionario = req.body as Cuestionario;
        let result = await calcularResultadoRiesgoDespresion(cuestionario);
        resp.msg = "Cuestionario finalizado";
        resp.cod = result ? 200 : 400;
        resp.data = {result};
    }
    catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp); 
}

export const cuestionarioPlutchik = async (req: Request, res: Response) => {
    let resp = new RespGeneric();
    try {
        let cuestionario = req.body.cuestionario;
        let result = await calcularResultadoPlutchik(cuestionario);
        resp.msg = "Cuestionario finalizado";
        resp.cod = result ? 200 : 400;
        resp.data = {result, riesgo: result >= 6};
    }
    catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp); 
}

// export const addPlanSeguridadC = async (req: Request, res: Response) => {
//     let resp = new RespGeneric();
//     try {
//         let plan : PlanSeguridad = req.body as PlanSeguridad;
//         let result = await addPlanSeguridad(plan);
//         resp.msg = "Plan anadido con exito";
//         resp.cod = result ? 200 : 400;
//     }
//     catch (e) {
//         resp.msg = e as string;
//         resp.cod = 500;
//     }
//     res.json(resp); 
// }

export const addPlanSeguridadC = async (req: Request, res: Response) => {
    let resp = new RespGeneric();
    const nombre_archivo = (req as any).files;
    try {
        let saveFiles = await addPlanSeguridad(nombre_archivo);
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
        let plan = await getOnePlan(body.id);
        resp.data = {plan};
        resp.cod = 200;
    } catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp);
}


export default { cuestionarioProbabilidadEnDepresion, cuestionarioPlutchik, addPlanSeguridadC, getOpnePlanC };