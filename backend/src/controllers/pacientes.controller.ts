import { Request, Response } from 'express';
import RespGeneric from '../models/RespGeneric';
import { Pacientes } from '../entities/Pacientes';
import { addPaciente, getAllPacientes, getOnePaciente} from '../services/pacientes.service';

export const addNewPaciente = async (req: Request, res: Response) => {
    let resp = new RespGeneric();
    try {
        let paciente : Pacientes = req.body as Pacientes;
        let result = await addPaciente(paciente);
        resp.msg = "Paciente anadido con exito";
        resp.cod = result ? 200 : 400;
    }
    catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp); 
}

export const getOnePacienteController = async (req:Request, res:Response) => {
    let resp = new RespGeneric();
    try {
        let body = req.body;
        let paciente = await getOnePaciente(body.id);
        resp.data = {paciente: paciente};
        resp.cod = 200;
    } catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp);
}


export const getAllPacientesControllers = async (_req:Request, res:Response) => {
    let resp = new RespGeneric();
    try {
        let pacientes = await getAllPacientes();
        resp.data = {pacientes: pacientes};
        resp.cod = 200;
    } catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp); 
}

export default { addNewPaciente, getOnePacienteController, getAllPacientesControllers};