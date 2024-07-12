import { Request, Response } from 'express';
import RespGeneric from '../models/RespGeneric';
import Cuestionario from '../models/Cuestionario';
import { calcularResultadoRiesgoDespresion, calcularResultadoPlutchik} from '../services/cuestionarios.service'
import { PlanSeguridad } from '../entities/PlanSeguridad';
import { updatePacientesResultService, updatePacientesService } from '../services/pacientes.service';
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
        let id_usuario = req.body.id_usuario;
        let result = await calcularResultadoPlutchik(cuestionario);
        let savePacienteResult = await updatePacientesResultService(id_usuario, result)
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



export default { cuestionarioProbabilidadEnDepresion, cuestionarioPlutchik};