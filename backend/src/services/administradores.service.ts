import { Administradores } from "../entities/Administrador";
import { DB } from "../config/typeorm";
import { SelectQueryBuilder } from "typeorm";

export const addAdmin = async (admin: Administradores): Promise<boolean> => {
    let res = await DB.getRepository(Administradores).save(admin);
    return res != null;
}

export const getOneAdmin = async (id: number): Promise<Administradores | null> => {
    let admin = await DB.getRepository(Administradores).findOne({
        where: [
            { id: id }]
    });

    return admin;
}

export const getAllAdmins = async ():Promise<Administradores[]> => {
    let admin = await DB.getRepository(Administradores).find();
    return admin;
}
