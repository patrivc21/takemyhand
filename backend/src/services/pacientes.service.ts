import { Pacientes } from "../entities/Pacientes";
import { DB } from "../config/typeorm";
import { Between, SelectQueryBuilder } from "typeorm";
import { RolPaciente } from "../entities/RolPacientes";
import { Usuarios } from "../entities/Usuarios";
import { HiloUsuarios } from "../entities/HiloUsuarios";
import path from "path";
import { ArchivosHiloUsuario } from "../entities/ArchivosHiloUsuarios";
import { LoginRegister } from "../entities/LoginRegister";
import { getOnePlan } from "./planseguridad.service";
import { sendEmail } from "../helpers/mail.helper";
import { PlanSeguridad } from "../entities/PlanSeguridad";


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

export const addEstadoAnimo = async (estado: LoginRegister): Promise<boolean> => {
    let res = await DB.getRepository(LoginRegister).save(estado);
    return res != null;
}

export const verificarEstadoAnimo = async (id_usuario: number): Promise<any> => {
    // 1. Obtener la fecha actual y la fecha de hace 5 días
    const fechaActual = new Date();
    const fechaHaceCincoDias = new Date();
    fechaHaceCincoDias.setDate(fechaActual.getDate() - 5);

    // 2. Obtener los registros de estado de ánimo de los últimos 5 días
    const registros = await DB.getRepository(LoginRegister).find({
        where: {
            id_usuario,
            fecha: Between(fechaHaceCincoDias, fechaActual),
        },
        order: {
            fecha: 'ASC',
        },
    });

    // 3. Obtener el nombre del usuario
    const usuario = await DB.getRepository(Usuarios).findOne({
        where: {
            id: id_usuario
        },
        select: ['nombre', 'apellidos']
    });

    // 4. Verificar si hay al menos 5 registros y si todos tienen estado <= 3
    if (registros.length >= 5 && registros.every(registro => registro.estado <= 3)) {
        // 5. Obtener el plan de seguridad del usuario
        const planSeguridad = await DB.getRepository(PlanSeguridad).findOne({
            where: { id_usuario }
        });

        if (planSeguridad && planSeguridad.emails) {
            // 6. Enviar un correo a cada persona en la lista de emails del plan de seguridad
            const emails = planSeguridad.emails.includes(',')
                ? planSeguridad.emails.split(',').map((email: string) => email.trim())  // Si hay comas, separar los emails y eliminarlas
                : [planSeguridad.emails.trim()];  // Si no hay comas, simplemente agregar el único email a la lista
                
            for (const email of emails) {
                await sendEmail(
                    email.trim(), 
                    "Alerta: Estado de ánimo bajo", 
                    `Estimado/a familiar/amigo/conocido,\n\n` +
                    `Le informamos que ${usuario?.nombre} ${usuario?.apellidos} ha reportado un estado de ánimo bajo durante 5 días consecutivos en nuestra aplicación de salud mental.\n\n` +
                    `Dado que el bienestar de nuestros usuarios es nuestra máxima prioridad, consideramos importante que esté al tanto de esta situación para que pueda brindarle el apoyo necesario. Le recomendamos que se comunique con ${usuario?.nombre} ${usuario?.apellidos} para ofrecerle su ayuda y, si lo considera oportuno, consultar con un profesional de la salud mental.\n\n` +
                    `Si necesita más información o apoyo, no dude en ponerse en contacto con nosotros.\n\n` +
                    `Atentamente,\n` +
                    `El equipo de Take My Hand.`
                );
            }  
        } else {
            // 7. Si no hay emails en el plan de seguridad, obtener el email del profesional asignado
            const paciente = await DB.getRepository(Pacientes).findOne({
                where: { id_usuario },
                relations: ['profesional_asociado']
            });

            if (paciente?.profesional_asociado?.email) {
                // 8. Enviar un correo al profesional asignado
                await sendEmail(
                    paciente.profesional_asociado.email, 
                    "Alerta: Estado de ánimo bajo", 
                    `Estimado/a profesional,\n\n` +
                    `Le informamos que su paciente ${usuario?.nombre} ${usuario?.apellidos} ha reportado un estado de ánimo bajo durante 5 días consecutivos en nuestra aplicación de salud mental.\n\n` +
                    `Consideramos importante que esté al tanto de esta situación para que pueda tomar las medidas necesarias para ofrecerle apoyo y asistencia.\n\n` +
                    `Atentamente,\n` +
                    `El equipo de Take My Hand.`
                );
            }
        }
    }
};






    

