import { Pacientes } from "../entities/Pacientes";
import { DB } from "../config/typeorm";
import { SelectQueryBuilder } from "typeorm";
import { RolPaciente } from "../entities/RolPacientes";
import { Usuarios } from "../entities/Usuarios";
import { HiloUsuarios } from "../entities/HiloUsuarios";
import path from "path";
import { ArchivosHiloUsuario } from "../entities/ArchivosHiloUsuarios";


export const addUsuarios = async (usuarios: Usuarios): Promise<boolean> => {
    let res = await DB.getRepository(Usuarios).save(usuarios);
    return res != null;
}

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

export const getAllPacientes = async (): Promise<any[]> => {
    const pacientes = await DB.getRepository(Pacientes)
        .createQueryBuilder('paciente')
        .leftJoinAndSelect('paciente.rolPaciente', 'rolPaciente')
        .select(['paciente', 'rolPaciente.nombre'])
        .getRawMany();

    return pacientes;
}

export const getAllRoles = async ():Promise<Pacientes[]> => {
    let roles = await DB.getRepository(Pacientes).find();
    return roles;
}


export const updatePacientesService = async(paciente: any): Promise<boolean> => {
    let pacToUpdate = await DB.getRepository(Pacientes).findOneBy({email: paciente.email});
    let resp = null;
    if(pacToUpdate){
        Object.assign(pacToUpdate, paciente);
        resp = await DB.getRepository(Pacientes).save(pacToUpdate);
    }
    return resp != null;
}


export const deleteOnePacienteService = async(id: number): Promise<boolean> => {
    let pacToEliminate = await DB.getRepository(Pacientes).findOneBy({id: id});
    let resp = null;
    if(pacToEliminate){
        resp = await DB.getRepository(Pacientes).remove(pacToEliminate);
    }
    return resp != null;
}

export const deletePacientesService = async(ids: number[]): Promise<boolean> => {
    try {
        const deleteResult = await DB.getRepository(Pacientes).delete(ids);
        return deleteResult.affected != null;
    } catch (error) {
        console.error('Error deleting patients:', error);
        return false;
    }
}

export const updatePacientesResultService = async(id_usuario: any, resultado: any): Promise<boolean> => {
    let pacToUpdate = await DB.getRepository(Pacientes).findOneBy({ id_usuario });
    
    if (pacToUpdate) {
        pacToUpdate.resultado_formulario = resultado;
        await DB.getRepository(Pacientes).save(pacToUpdate);
        return true;
    }

    return false;
}


    

