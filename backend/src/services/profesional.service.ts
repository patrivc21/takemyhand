import { Profesionales } from "../entities/Profesional";
import { DB } from "../config/typeorm";
import { SelectQueryBuilder } from "typeorm";

export const addProfesional = async (admin: Profesionales): Promise<boolean> => {
    let res = await DB.getRepository(Profesionales).save(admin);
    return res != null;
}

export const getOneProfesional = async (id: number): Promise<Profesionales | null> => {
    let res = await DB.getRepository(Profesionales).findOne({
        where: [
            { id: id }]
    });

    return res;
}

export const getAllProfesionales = async ():Promise<Profesionales[]> => {
    let res = await DB.getRepository(Profesionales).find();
    return res;
}

export const updateProfesionalesService = async(profesional: Profesionales): Promise<boolean> => {
    let profToUpdate = await DB.getRepository(Profesionales).findOneBy({id: profesional.id});
    let resp = null;
    if(profToUpdate){
        Object.assign(profToUpdate, profesional);
        resp = await DB.getRepository(Profesionales).save(profToUpdate);
    }
    return resp != null;
}

export const deleteOneProfesionalesService = async(id: number): Promise<boolean> => {
    let profToEliminate = await DB.getRepository(Profesionales).findOneBy({id: id});
    let resp = null;
    if(profToEliminate){
        resp = await DB.getRepository(Profesionales).remove(profToEliminate);
    }
    return resp != null;
}

export const deleteProfesionalesService = async(ids: number[]): Promise<boolean> => {
    try {
        const deleteResult = await DB.getRepository(Profesionales).delete(ids);
        return deleteResult.affected != null;
    } catch (error) {
        console.error('Error al borrar los profesionales profesionales:', error);
        return false;
    }
}

