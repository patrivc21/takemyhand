import { Usuarios } from "../entities/Usuarios";
import { DB } from "../config/typeorm";
import { SelectQueryBuilder } from "typeorm";

export const addUsuarios = async (usuarios: Usuarios): Promise<boolean> => {
    let res = await DB.getRepository(Usuarios).save(usuarios);
    return res != null;
}

export const getOneUser= async (id: number): Promise<Usuarios | null> => {
    let user = await DB.getRepository(Usuarios).findOne({
        where: [
            { id: id }]
    });

    return user;
}

export const getAllUsers = async () => {
    let users = await DB.getRepository(Usuarios).find();
    return users;
}
