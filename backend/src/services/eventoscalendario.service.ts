import { Profesionales } from "../entities/Profesional";
import { DB } from "../config/typeorm";
import { SelectQueryBuilder } from "typeorm";
import path from "path";
import { EventosCalendario } from "../entities/EventosCalendario";

export const addEvento = async (evento: EventosCalendario): Promise<boolean> => {
    let res = await DB.getRepository(EventosCalendario).save(evento);
    return res != null;
}

export const updateEvento = async(evento: EventosCalendario): Promise<boolean> => {
    let eventoToUpdate = await DB.getRepository(EventosCalendario).findOneBy({id: evento.id});
    let resp = null;
    if(eventoToUpdate){
        Object.assign(eventoToUpdate, evento);
        resp = await DB.getRepository(EventosCalendario).save(eventoToUpdate);
    }
    return resp != null;
}

export const deleteEvento = async(ids: number[]): Promise<boolean> => {
    try {
        const deleteResult = await DB.getRepository(EventosCalendario).delete(ids);
        return deleteResult.affected != null;
    } catch (error) {
        console.error('Error al borrar los eventos del calendario:', error);
        return false;
    }
}

export const getEventoUsuario = async (id: number): Promise<any[]> => {
    let res = await DB.getRepository(EventosCalendario).find({
        where: [
            { id_usuario: id }]
    });

    return res;
}
