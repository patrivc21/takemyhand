import { Pacientes } from "../entities/Pacientes";
import { DB } from "../config/typeorm";
import { SelectQueryBuilder } from "typeorm";

export const addPaciente = async (admin: Pacientes): Promise<boolean> => {
    let res = await DB.getRepository(Pacientes).save(admin);
    return res != null;
}

export const getOnePaciente = async (id: number): Promise<Pacientes | null> => {
    let res = await DB.getRepository(Pacientes).findOne({
        where: [
            { id: id }]
    });

    return res;
}

export const getAllPacientes = async ():Promise<Pacientes[]> => {
    let res = await DB.getRepository(Pacientes).find();
    return res;
}

export const getAllRoles = async ():Promise<Pacientes[]> => {
    let roles = await DB.getRepository(Pacientes).find();
    return roles;
}
