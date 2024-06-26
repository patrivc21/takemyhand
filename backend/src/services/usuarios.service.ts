import { Usuarios } from "../entities/Usuarios";
import { DB } from "../config/typeorm";
import { Not, SelectQueryBuilder } from "typeorm";
import { RolUsuarios } from "../entities/RolUsuarios";

export const addUsuarios = async (usuarios: Usuarios): Promise<Usuarios> => {
    let res = await DB.getRepository(Usuarios).save(usuarios);
    return res;
}

export const getOneUser = async (id: number): Promise<Usuarios | null> => {
    let user = await DB.getRepository(Usuarios).findOne({
        where: [
            { id: id }]
    });

    return user;
}

export const getAllUsers = async ():Promise<Usuarios[]> => {
    let users = await DB.getRepository(Usuarios).find();
    return users;
}

export const getUserByEmail = async (email: string): Promise<Usuarios | null> => {
    let user = await DB.getRepository(Usuarios).findOne({
        where: [
            { email: email }]
    });
    return user;
}

export const getAllRoles = async ():Promise<RolUsuarios[]> => {
    let roles = await DB.getRepository(RolUsuarios).find();
    return roles;
}


export const updateUsuariosService = async(paciente: any): Promise<boolean> => {
    console.log(paciente)
    let pacToUpdate = await DB.getRepository(Usuarios).findOneBy({email: paciente.email});
    let resp = null;
    if(pacToUpdate){
        Object.assign(pacToUpdate, paciente);
        resp = await DB.getRepository(Usuarios).save(pacToUpdate);
    }
    return resp != null;
}

export const getAllUsersExceptMe = async (id: number): Promise<Usuarios[]> => {
    let users = await DB.getRepository(Usuarios).find({
        where: {
            id: Not(id) 
        }
    });
    return users;
}

