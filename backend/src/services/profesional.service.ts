import { Profesionales } from "../entities/Profesional";
import { DB } from "../config/typeorm";
import { SelectQueryBuilder } from "typeorm";
import path from "path";
import { HiloProfesionales } from "../entities/HiloProfesionales";

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

export const addPublicacion = async (publicacion: any): Promise<any> => {
    let datos = {
      fecha_hora: new Date(),
      titulo: publicacion.titulo,
      mensaje: publicacion.mensaje,
      nombre_archivo: '',
      id_profesional: publicacion.id_profesional
    };

    let res = await DB.getRepository(HiloProfesionales).save(datos);
    return res;
}

export const addArchivoPublicacion = async (plan: any, id: number): Promise<boolean> => {
    let filesSaved;
    
      for (const key in plan) {
          if (plan.hasOwnProperty(key)) {
              const file = plan[key];
              let archivo_com = {
                  id: id,
                  nombre_archivo: file ? path.basename(file.path) : ''
              };
    
              filesSaved = await DB.getRepository(HiloProfesionales).save(archivo_com);
          }
      }
    
      return filesSaved != null;
}

export const deletePublicacion = async(ids: number[]): Promise<boolean> => {
    try {
        const deleteResult = await DB.getRepository(HiloProfesionales).delete(ids);
        return deleteResult.affected != null;
    } catch (error) {
        console.error('Error al borrar las publicaciones:', error);
        return false;
    }
}

export const getAllPublicaciones = async ():Promise<HiloProfesionales[]> => {
    let res = await DB.getRepository(HiloProfesionales)
    .createQueryBuilder('h')
    .leftJoinAndSelect('h.profesional', 'p')
    .getMany();

    return res;
}

export const getOnePublicacion= async (id: number): Promise<HiloProfesionales[]> => {
    let res = await DB.getRepository(HiloProfesionales)
        .createQueryBuilder('h')
        .leftJoinAndSelect('h.profesional', 'p')
        .where('h.id = :id', { id })
        .getMany();
        
    return res;
}
    
  
