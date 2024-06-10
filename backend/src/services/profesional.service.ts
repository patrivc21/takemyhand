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
