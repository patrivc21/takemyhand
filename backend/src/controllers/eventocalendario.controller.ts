import { Request, Response } from 'express';
import RespGeneric from '../models/RespGeneric';
import { addEvento, deleteEvento, updateEvento } from '../services/eventoscalendario.service';
import { EventosCalendario } from '../entities/EventosCalendario';

export const addEventoCalendario = async (req: Request, res: Response) => {
    let resp = new RespGeneric();
    try {
        let evento : EventosCalendario = req.body as EventosCalendario;
        let result = await addEvento(evento);
        resp.msg = "Evento anadido con exito";
        resp.cod = result ? 200 : 400;
    }
    catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp); 
}



export const updateEventoCalendario = async (req: Request, res: Response) => {
    let resp = new RespGeneric();
    try {
        let evento : EventosCalendario = req.body as EventosCalendario;
        let result = await updateEvento(evento);
        resp.cod = result ? 200 : 400;
        resp.data = {evento: result};
    }
    catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
    }
    res.json(resp)
}


export const deleteEventoCalendario = async (req: Request, res: Response) => {
    let resp = new RespGeneric();
    try {
        const ids: number[] = req.body.ids;

        if (!ids || !Array.isArray(ids)) {
            return res.status(400).json({ message: 'Invalid request. Please provide an array of IDs.' });
        }

        let result = await deleteEvento(ids);
        resp.cod = result ? 200 : 400;
        resp.data = {result};
        resp.msg = "Eventos eliminados con exito."

    } catch (e) {
        resp.msg = e as string;
        resp.cod = 500;
        resp.msg = "Error al eliminar eventos"
    }
};


export default { addEventoCalendario, updateEventoCalendario, deleteEventoCalendario };